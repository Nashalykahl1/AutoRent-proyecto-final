import { useState } from "react";

import { useNavigate } from "react-router-dom";

import "./Register.css";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [lastname, setLastname] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  function handleRegister(e) {

    e.preventDefault();

    if(
      !name ||
      !lastname ||
      !email ||
      !password
    ) {

      setError(
        "Completá todos los campos"
      );

      return;
    }

    fetch("http://localhost:8080/users/register", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
        lastname,
        email,
        password,
      }),

    })

      .then(res => res.json())

      .then(data => {

        localStorage.setItem(
          "user",
          JSON.stringify(data)
        );

        navigate("/");

      })

      .catch(() => {

        setError(
          "Error al registrarse"
        );

      });

  }

  return (

    <div className="register-container">

      <form
        className="register-form"
        onSubmit={handleRegister}
      >

        <h2>
          Crear cuenta
        </h2>

        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Apellido"
          value={lastname}
          onChange={(e) =>
            setLastname(e.target.value)
          }
        />

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
          Registrarme
        </button>

      </form>

    </div>

  );
}

export default Register;