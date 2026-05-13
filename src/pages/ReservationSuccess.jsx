import { Link } from "react-router-dom";
import "./ReservationSuccess.css";

function ReservationSuccess() {

  return (

    <div className="success-page">

      <div className="success-box">

        <h1>
          ✅ Reserva realizada
        </h1>

        <p>
          Tu reserva fue confirmada
          con éxito.
        </p>

<p className="email-info">

  📩 También enviamos un correo
  electrónico con los detalles
  de tu reserva.

</p>
        <Link to="/">

          <button>
            Volver al inicio
          </button>

        </Link>

      </div>

    </div>

  );
}

export default ReservationSuccess;