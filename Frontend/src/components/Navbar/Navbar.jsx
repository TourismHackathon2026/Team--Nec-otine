import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Navbar.css'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link to="/">Tour Genie</Link>
      </div>
      <ul className="navbar__links">
        <li><NavLink to="/guides">Find Guides</NavLink></li>
        <li><NavLink to="/planner">Trip Planner</NavLink></li>
        {user ? (
          <>
            <li><NavLink to="/dashboard">Dashboard</NavLink></li>
            <li>
              <button className="navbar__logout" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li><NavLink to="/login">Login</NavLink></li>
            <li><NavLink to="/signup" className="navbar__cta">Get Started</NavLink></li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar