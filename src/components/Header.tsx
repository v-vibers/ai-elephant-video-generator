import { useSubscribeDev } from '@subscribe.dev/react';
import { useTheme } from '../contexts/ThemeContext';

export function Header() {
  const { user, usage, subscriptionStatus, subscribe, signOut } = useSubscribeDev();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="logo-section">
          <span className="logo-icon">🐘</span>
          <span className="logo-text">Elephant Video AI</span>
        </div>

        <div className="header-actions">
          {usage && (
            <div className="credits-display">
              <span className="credits-icon">💎</span>
              <span className="credits-text">
                {usage.remainingCredits.toLocaleString()} credits
              </span>
            </div>
          )}

          {subscriptionStatus && (
            <div className="plan-display">
              <span className="plan-badge">
                {subscriptionStatus.plan?.name || 'Free'}
              </span>
            </div>
          )}

          <button className="manage-button" onClick={subscribe!}>
            Manage Plan
          </button>

          <button
            className="theme-toggle-button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          <div className="user-section">
            {user?.avatarUrl && (
              <img
                src={user.avatarUrl}
                alt={user.email}
                className="user-avatar"
              />
            )}
            {!user?.avatarUrl && (
              <div className="user-avatar-placeholder">
                {user?.email?.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="user-menu">
              <span className="user-email">{user?.email}</span>
              <button className="sign-out-button" onClick={signOut}>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}