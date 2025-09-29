import { useState } from 'react';
import { useSubscribeDev } from '@subscribe.dev/react';

type VideoHistoryItem = {
  id: string;
  prompt: string;
  videoUrl: string;
  timestamp: number;
  aspectRatio: string;
};

export function VideoGenerator() {
  const { client, useStorage } = useSubscribeDev();

  const [videoHistory, setVideoHistory, syncStatus] = useStorage!<VideoHistoryItem[]>('video-history', []);
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16' | '1:1'>('16:9');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!client || !prompt.trim()) return;

    setLoading(true);
    setError(null);
    setCurrentVideo(null);

    try {
      const fullPrompt = `${prompt}. A majestic elephant in cinematic quality.`;

      const response = await client.run('wan-video/wan-2.2-5b-fast', {
        input: {
          prompt: fullPrompt,
          aspect_ratio: aspectRatio,
        },
      });

      const [videoUrl] = response.output;
      setCurrentVideo(videoUrl as string);

      // Add to history
      const newVideo: VideoHistoryItem = {
        id: Date.now().toString(),
        prompt: prompt,
        videoUrl: videoUrl as string,
        timestamp: Date.now(),
        aspectRatio,
      };

      setVideoHistory([newVideo, ...videoHistory.slice(0, 9)]); // Keep last 10
    } catch (err: any) {
      console.error('Video generation failed:', err);

      if (err.type === 'insufficient_credits') {
        setError('Insufficient credits. Please upgrade your plan to continue.');
      } else if (err.type === 'rate_limit_exceeded') {
        const retrySeconds = Math.ceil((err.retryAfter || 60000) / 1000);
        setError(`Rate limit exceeded. Please try again in ${retrySeconds} seconds.`);
      } else {
        setError('Failed to generate video. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="video-generator">
      <div className="generator-header">
        <h2>Generate Elephant Video</h2>
        <p className="generator-subtitle">
          Describe your elephant scene and let AI bring it to life
        </p>
      </div>

      <div className="input-section">
        <div className="prompt-input-group">
          <label htmlFor="prompt">Video Prompt</label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="E.g., An elephant walking through a savanna at sunset..."
            rows={3}
            disabled={loading}
          />
        </div>

        <div className="aspect-ratio-group">
          <label>Aspect Ratio</label>
          <div className="aspect-ratio-buttons">
            <button
              className={`aspect-button ${aspectRatio === '16:9' ? 'active' : ''}`}
              onClick={() => setAspectRatio('16:9')}
              disabled={loading}
            >
              16:9 <span className="aspect-label">Landscape</span>
            </button>
            <button
              className={`aspect-button ${aspectRatio === '1:1' ? 'active' : ''}`}
              onClick={() => setAspectRatio('1:1')}
              disabled={loading}
            >
              1:1 <span className="aspect-label">Square</span>
            </button>
            <button
              className={`aspect-button ${aspectRatio === '9:16' ? 'active' : ''}`}
              onClick={() => setAspectRatio('9:16')}
              disabled={loading}
            >
              9:16 <span className="aspect-label">Portrait</span>
            </button>
          </div>
        </div>

        <button
          className="generate-button"
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              Generating Video...
            </>
          ) : (
            <>
              <span>🎬</span>
              Generate Video
            </>
          )}
        </button>

        {syncStatus !== 'synced' && syncStatus !== 'local' && (
          <div className="sync-status">
            Sync status: {syncStatus}
          </div>
        )}

        {error && (
          <div className="error-message">
            <span>⚠️</span>
            {error}
          </div>
        )}
      </div>

      {currentVideo && (
        <div className="current-video-section">
          <h3>Generated Video</h3>
          <div className="video-container">
            <video
              src={currentVideo}
              controls
              autoPlay
              loop
              className="generated-video"
            >
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="video-actions">
            <a
              href={currentVideo}
              download={`elephant-video-${Date.now()}.mp4`}
              className="download-button"
            >
              ⬇️ Download Video
            </a>
          </div>
        </div>
      )}

      {videoHistory.length > 0 && (
        <div className="history-section">
          <h3>Recent Videos</h3>
          <div className="video-grid">
            {videoHistory.map((video) => (
              <div key={video.id} className="history-item">
                <video
                  src={video.videoUrl}
                  controls
                  className="history-video"
                  onClick={() => setCurrentVideo(video.videoUrl)}
                >
                  Your browser does not support the video tag.
                </video>
                <div className="history-info">
                  <p className="history-prompt">{video.prompt}</p>
                  <p className="history-meta">
                    {video.aspectRatio} • {formatDate(video.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}