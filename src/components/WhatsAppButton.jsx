import "./WhatsAppButton.css";
import { useState } from "react";

function WhatsAppButton() {

  const [message, setMessage]
    = useState("");

  const [error, setError]
    = useState("");

  function openWhatsApp() {

    try {

      window.open(
        "https://wa.me/5491154224327?text=Hola! Tengo una consulta sobre un vehículo 🚗",
        "_blank",
        "noopener,noreferrer"
      );

      setMessage(
        "Redirigiendo a WhatsApp ✅"
      );

      setError("");

    } catch (error) {

      setError(
        "No se pudo abrir WhatsApp 😢"
      );

      setMessage("");

    }

  }

  return (

    <>

      {message && (

        <div className="whatsapp-message">
          {message}
        </div>

      )}

      {error && (

        <div className="whatsapp-error">
          {error}
        </div>

      )}

      <button
        className="whatsapp-btn"
        onClick={openWhatsApp}
      >

        💬

      </button>

    </>

  );
}

export default WhatsAppButton;