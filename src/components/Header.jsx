import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="container">
        
        <div className="header-left">
          <a href="/" className="logo">
            <span className="logo-icon">AR</span>
            <div className="logo-text">
              <h1>AutoRent</h1>
              <p>Alquilá tu auto ideal</p>
            </div>
          </a>
        </div>

        <div className="header-right">
          <button className="btn secondary">Crear cuenta</button>
          <button className="btn primary">Iniciar sesión</button>
          <Link to="/admin">
         <button className="btn-admin">Administración</button>
          </Link>
        </div>

      </div>
    </header>
  );
}

export default Header;
