import "./HistoryPage.css";
import { useEffect, useState } from "react";

function HistoryPage() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );
  
 const [reservations, setReservations]
  = useState([]);
  const [products, setProducts] =
  useState([]);

useEffect(() => {

  if (!user) return;

  fetch(
   ` http://localhost:8080/reservations/${user.id}`
  )
  .then(res => {
  console.log("STATUS RESERVAS", res.status);
  return res.json();
})

    .then(data => {
  if (!Array.isArray(data)) {

    setReservations([]);
    return;

  }
    setReservations(data);
     })
     
    .catch(err => {
    console.log(
    "Error al traer reservas",
    err
  );
    }); 

    fetch("http://localhost:8080/products")
    .then(res => {
  console.log("STATUS PRODUCTS", res.status);
  return res.json();
})
  .then(data => {

    setProducts(data);

  });


}, []);

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
           {
      products.find(
        p => p.id === reservation.productId
       )?.name || "Auto no encontrado"
      }
            </h2>

            <p>

              📅 Reserva realizada:
              {" "}
              {new Date(
               reservation.startDate
                  ).toLocaleDateString()}

            </p>

            <p>

              🚗 Fecha de uso:
              {" "}
              {new Date(
              reservation.startDate
                 ).toLocaleDateString()}

                  {" "}al{" "}

            {new Date(
                reservation.endDate
               ).toLocaleDateString()}

            </p>

          </div>

        ))}

      </div>

    </div>

  );
}

export default HistoryPage;