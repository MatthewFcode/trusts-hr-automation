import { useState } from 'react'
import Navigation from './Nav.tsx'
import { Outlet, Link } from 'react-router'

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

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
