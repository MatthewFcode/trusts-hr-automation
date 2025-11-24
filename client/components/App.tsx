import { useState } from 'react'
import Navigation from './Nav.tsx'
import { Outlet, Link, useNavigate } from 'react-router'
import { useAuth0 } from '@auth0/auth0-react'
import { IfAuthenticated, IfNotAuthenticated } from './Auth0.tsx'

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const { logout, loginWithRedirect } = useAuth0()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } })
  }

  const handleLogin = () => {
    // when the auth0 authentication is done then head to the registration page
    loginWithRedirect({
      authorizationParams: {
        redirectUri: `${window.location.origin}/registration`,
      },
    })
  }

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <div className="app">
      <div className="app-header">
        <Link to="/">
          <img src="/images/The-Trusts-Icon.webp" alt="the trusts logo" />
        </Link>
        <h1>The Trusts HR Automation Service</h1>
        <IfNotAuthenticated>
          <button onClick={handleLogin}>Sign In</button>
        </IfNotAuthenticated>
        <IfAuthenticated>
          <button onClick={handleLogout}>Sign Out</button>
        </IfAuthenticated>
      </div>

      <button
        className={`sidebar-toggle ${!sidebarCollapsed ? 'sidebar-open' : ''}`}
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        {sidebarCollapsed ? '☰' : '✕'}
      </button>

      <Navigation collapsed={sidebarCollapsed} />

      <main
        className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}
      >
        <Outlet />
      </main>
    </div>
  )
}

export default App
