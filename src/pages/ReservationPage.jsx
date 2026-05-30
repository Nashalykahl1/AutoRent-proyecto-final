import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./ReservationPage.css";
 import { useNavigate } from "react-router-dom";

function ReservationPage() {

  const navigate = useNavigate();

  const { id } = useParams();

  const [car, setCar] = useState(null);

  const [bookedDates, setBookedDates] =
    useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [startDate, setStartDate] =
    useState(null);

  const [endDate, setEndDate] =
    useState(null);

  const [city, setCity] =
    useState("");

  const [notes, setNotes] =
    useState("");

  const [reservationError,
    setReservationError] =
    useState("");

  const [reservationSuccess,
    setReservationSuccess] =
    useState("");

  useEffect(() => {

    if (!user) {

      navigate("/login");

      return;

    }

    // TRAER AUTO

  fetch(`http://localhost:8080/products/${id}`)
  .then(res => res.json())
  .then(data => {

    setCar(data);

  })

  .catch(err => {

    console.error(
      "Error al cargar auto:",
      err
    );

  });

    // TRAER RESERVAS REALES

    fetch(
      `http://localhost:8080/reservations/product/${id}`
    )

      .then(res => res.json())

      .then(data => {

        const dates = [];

        data.forEach(reservation => {

          const start =
            new Date(reservation.startDate);

          const end =
            new Date(reservation.endDate);

          let current =
            new Date(start);

          while (current <= end) {

            dates.push(
              new Date(current)
            );

            current.setDate(
              current.getDate() + 1
            );

          }

        });

        setBookedDates(dates);

      })

      .catch(err => {

        console.error(
          "Error al cargar reservas:",
          err
        );

      });

  }, [id, navigate]);

  function handleReservation() {

    if (!startDate || !endDate) {

      setReservationError(
        "Seleccioná un rango de fechas."
      );

      setReservationSuccess("");

      return;

    }

    setReservationError("");

    const reservation = {

      startDate:
        startDate.toISOString(),

      endDate:
        endDate.toISOString(),

      city,

      notes,

      user: {
        id: user.id
      },

      product: {
        id: car.id
      }

    };

    fetch(
      "http://localhost:8080/reservations",
      {

        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify(
          reservation
        )

      }
    )

      .then(res => {

        if (!res.ok) {

          throw new Error(
            "Error al guardar reserva"
          );

        }

        return res.json();

      })

      .then(() => {

        setReservationSuccess(
          `📩 Reserva realizada correctamente para ${user.email}`
        );

        setTimeout(() => {

          navigate(
            "/reservation-success"
          );

        }, 1500);

      })

      .catch(err => {

        setReservationError(
          err.message
        );

      });

  }

  if (!car) {

    return <h2>Cargando reserva...</h2>;

  }

  return (

    <div className="reservation-page">

      <div className="reservation-box">

        <img
          src={car.image}
          alt={car.name}
          className="reservation-image"
        />

        <h2>
          {car.name}
        </h2>

        <p>
          📍 {car.location}
        </p>

        <p>
          {car.description}
        </p>

        <h1>
          Confirmar reserva
        </h1>

        <p>
          Seleccioná el rango
          de fechas para reservar.
        </p>

        <div className="reservation-calendar">

          <DatePicker
            selected={startDate}
            onChange={(date) =>
              setStartDate(date)
            }
            selectsStart
            startDate={startDate}
            endDate={endDate}
            excludeDates={bookedDates}
            placeholderText="Fecha inicio"
            className="reservation-input"
          />

          <DatePicker
            selected={endDate}
            onChange={(date) =>
              setEndDate(date)
            }
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            excludeDates={bookedDates}
            placeholderText="Fecha fin"
            className="reservation-input"
          />

        </div>

        <div className="reservation-info">

          <h3>
            Fechas seleccionadas
          </h3>

          <p>

            {startDate
              ? startDate.toLocaleDateString()
              : "Sin fecha"}

            {" "}→{" "}

            {endDate
              ? endDate.toLocaleDateString()
              : "Sin fecha"}

          </p>

        </div>

        <div className="user-info">

          <h3>
            Datos del usuario
          </h3>

          <p>
            Nombre: {user?.name}
          </p>

          <p>
            Apellido: {user?.lastname}
          </p>

          <p>
            Email: {user?.email}
          </p>

        </div>

        <div className="extra-info">

          <h3>
            Información adicional
          </h3>

          <div className="input-group">

            <label>
              Ciudad
            </label>

            <input
              type="text"
              placeholder="Ingresá tu ciudad"
              value={city}
              onChange={(e) =>
                setCity(e.target.value)
              }
            />

          </div>

          <div className="input-group">

            <label>
              Notas adicionales
            </label>

            <textarea
              placeholder="Información extra para la reserva..."
              value={notes}
              onChange={(e) =>
                setNotes(e.target.value)
              }
            />

          </div>

        </div>

        {reservationError && (

          <p className="reservation-error">
            {reservationError}
          </p>

        )}

        {reservationSuccess && (

          <p className="success-message">
            {reservationSuccess}
          </p>

        )}

        <button
          className="confirm-btn"
          onClick={handleReservation}
        >

          Confirmar reserva

        </button>

      </div>

    </div>

  );

}

export default ReservationPage;