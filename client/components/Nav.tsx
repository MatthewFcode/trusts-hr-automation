import { Link, useLocation } from 'react-router'

interface NavigationProps {
  collapsed: boolean
}

function Navigation({ collapsed }: NavigationProps) {
  const location = useLocation()

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <nav>
        <Link to="/" className={location.pathname === '/home' ? 'active' : ''}>
          <div>🏠 Home</div>
        </Link>
        <Link
          to="/cv-extractor"
          className={location.pathname === '/cv-extractor' ? 'active' : ''}
        >
          <div>📄 CV Extractor</div>
        </Link>
      </nav>
    </aside>
  )
}

export default Navigation
