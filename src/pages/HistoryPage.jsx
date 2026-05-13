import "./HistoryPage.css";

function HistoryPage() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const reservations = [

    {
      id: 1,
      product: "BMW M4",
      reservationDate: "12/05/2026",
      useDate: "20/05/2026 al 25/05/2026"
    },

    {
      id: 2,
      product: "Audi A3",
      reservationDate: "02/05/2026",
      useDate: "10/05/2026 al 15/05/2026"
    }

  ];

  if (!user) {

    return (

      <div className="history-page">

        <h2>
          Debés iniciar sesión 😢
        </h2>

      </div>

    );

  }

  return (

    <div className="history-page">

      <h1>
        Mis reservas
      </h1>

      <div className="history-list">

        {reservations.map((reservation) => (

          <div
            className="history-card"
            key={reservation.id}
          >

            <h2>
              {reservation.product}
            </h2>

            <p>

              📅 Reserva realizada:
              {" "}
              {reservation.reservationDate}

            </p>

            <p>

              🚗 Fecha de uso:
              {" "}
              {reservation.useDate}

            </p>

          </div>

        ))}

      </div>

    </div>

  );
}

export default HistoryPage;