import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useLocation } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const location = useLocation();

  function handleLogin(e) {

    e.preventDefault();

    fetch("http://localhost:8080/users/login", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
        password,
      }),

    })

      .then(res => res.json())

      .then(data => {

        if(data && data.id) {

          localStorage.setItem(
            "user",
            JSON.stringify(data)
          );

          navigate("/");

        } else {

          setError(
            "Email o contraseña incorrectos"
          );
        }

      })

      .catch(() => {

        setError(
          "Error al iniciar sesión"
        );

      });

  }

  return (

    <div className="login-container">

      {location.state?.message && (

  <p className="login-message">
    {location.state.message}
  </p>

)}

      <form
        className="login-form"
        onSubmit={handleLogin}
      >

        <h2>
          Iniciar sesión
        </h2>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        {error && (
          <p className="error">
            {error}
          </p>
        )}

        <button type="submit">
          Ingresar
        </button>

      </form>

    </div>

  );
}

export default Login;