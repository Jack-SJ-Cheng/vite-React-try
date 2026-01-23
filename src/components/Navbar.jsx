import { NavLink } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <span className="navbar-brand">Creamyday</span>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/">登入</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/upload">上傳</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
} 