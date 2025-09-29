import { useSubscribeDev } from '@subscribe.dev/react';
import { SignInScreen } from './components/SignInScreen';
import { Header } from './components/Header';
import { VideoGenerator } from './components/VideoGenerator';
import './App.css';

// Component for authenticated users
function AuthenticatedApp() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <VideoGenerator />
      </main>
      <footer className="app-footer">
        <p>Powered by Subscribe.dev AI Platform</p>
      </footer>
    </div>
  );
}

// Main app component with authentication routing
function App() {
  const { isSignedIn, signIn } = useSubscribeDev();

  if (!isSignedIn) {
    return <SignInScreen signIn={signIn} />;
  }

  return <AuthenticatedApp />;
}

export default App;
