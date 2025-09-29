import { useSubscribeDev } from '@subscribe.dev/react';

export function Header() {
  const { user, usage, subscriptionStatus, subscribe, signOut } = useSubscribeDev();

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