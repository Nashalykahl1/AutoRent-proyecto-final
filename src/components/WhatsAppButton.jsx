import "./WhatsAppButton.css";

function WhatsAppButton() {

  function openWhatsApp() {

    try {

      window.open(
        "https://wa.me/5491154224327?text=Hola! Tengo una consulta sobre un vehículo 🚗",
        "_blank"
      );

      alert(
        "Redirigiendo a WhatsApp ✅"
      );

    } catch (error) {

      alert(
        "No se pudo abrir WhatsApp 😢"
      );

    }

  }

  return (

    <button
      className="whatsapp-btn"
      onClick={openWhatsApp}
    >

      💬

    </button>

  );
}

export default WhatsAppButton;