interface SignInScreenProps {
  signIn: () => void;
}

export function SignInScreen({ signIn }: SignInScreenProps) {
  return (
    <div className="sign-in-container">
      <div className="sign-in-content">
        <div className="elephant-icon">🐘</div>
        <h1>AI Elephant Video Generator</h1>
        <p className="subtitle">
          Create stunning AI-generated videos of elephants using cutting-edge AI models
        </p>
        <div className="features">
          <div className="feature">
            <span className="feature-icon">🎬</span>
            <span>High-quality video generation</span>
          </div>
          <div className="feature">
            <span className="feature-icon">⚡</span>
            <span>Fast rendering</span>
          </div>
          <div className="feature">
            <span className="feature-icon">🎨</span>
            <span>Customizable prompts</span>
          </div>
        </div>
        <button className="sign-in-button" onClick={signIn}>
          Sign In to Get Started
        </button>
        <p className="info-text">
          Start creating amazing elephant videos with AI
        </p>
      </div>
    </div>
  );
}