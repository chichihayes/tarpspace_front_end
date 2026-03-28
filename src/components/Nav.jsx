import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Nav() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <span className="logo-text">TARP</span><span className="logo-accent">SPACE</span>
      </div>
      <div className="nav-links">
        <NavLink to="/search" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Search</NavLink>
        <NavLink to="/history" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>History</NavLink>
        <NavLink to="/agents" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Agents</NavLink>
      </div>
      <div className="nav-user">
        <span className="user-email">{user?.email}</span>
        <button className="btn-signout" onClick={handleSignOut}>Sign Out</button>
      </div>
    </nav>
  )
}
