import "./Header.css";
import { Link, useNavigate } from "react-router-dom";

function Header() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  function logout() {

    localStorage.removeItem("user");

    navigate("/");

    window.location.reload();
  }

  return (

    <header className="header">

      <div className="container">

        <div className="header-left">

          <a href="/" className="logo">

            <span className="logo-icon">
              AR
            </span>

            <div className="logo-text">

              <h1>AutoRent</h1>

              <p>
                Alquilá tu auto ideal
              </p>

            </div>

          </a>

        </div>

        <div className="header-right">

          {!user ? (

            <>
              <Link to="/register">

                <button className="btn secondary">
                  Crear cuenta
                </button>

              </Link>

              <Link to="/login">

                <button className="btn primary">
                  Iniciar sesión
                </button>

              </Link>
            </>

          ) : (

            <div className="user-box">

              <div className="avatar">

                {user.name?.charAt(0)}
                {user.lastname?.charAt(0)}

              </div>

              <div>

                <p className="welcome">
                  Hola,
                </p>

                <h4>
                  {user.name}
                </h4>

              </div>

              <button
                className="logout-btn"
                onClick={logout}
              >

                Cerrar sesión

              </button>

            </div>

          )}

{user?.admin && (
<Link to="/admin">

            <button className="btn-admin">
              Administración
            </button>

          </Link>
       )}
        </div>

      </div>

    </header>
  );
}

export default Header;