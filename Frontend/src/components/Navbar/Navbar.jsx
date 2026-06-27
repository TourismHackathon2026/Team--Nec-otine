import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link to="/">Tour Genie</Link>
      </div>

      <ul className="navbar__links">
        <li><NavLink to="/guides">Find Guides</NavLink></li>
        <li><NavLink to="/planner">Trip Planner</NavLink></li>
        <li><NavLink to="/login">Login</NavLink></li>
        <li><NavLink to="/signup" className="navbar__cta">Get Started</NavLink></li>
      </ul>
    </nav>
  )
}

export default Navbar