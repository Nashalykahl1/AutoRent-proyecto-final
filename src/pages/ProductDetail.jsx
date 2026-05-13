import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./ProductDetail.css";

function ProductDetail() {
const{ id } = useParams();

const navigate = useNavigate();

  const [car, setCar] = useState(null);

  const [error, setError]
    = useState(false);

  const [selectedImage, setSelectedImage]
    = useState(null);

  const [showShare, setShowShare]
    = useState(false);

    const [shareMessage, setShareMessage]
  = useState(
    "Mirá este auto increíble 🚗"
  );
  // CALENDARIO
  const [startDate, setStartDate]
    = useState(null);

  const [endDate, setEndDate]
    = useState(null);

  // REVIEWS
  const [reviews, setReviews]
    = useState([
    {

      id: 1,

      user: "Camila",

      rating: 5,

      comment:
        "Excelente auto y muy cómodo.",

      date: "12/05/2026"

    },

    {

      id: 2,

      user: "Lucas",

      rating: 4,

      comment:
        "Muy buena experiencia.",

      date: "10/05/2026"

    }

  ]);

  const [newReview, setNewReview]
    = useState("");

  const [rating, setRating]
    = useState(0);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // PROMEDIO
  const averageRating = reviews.length > 0

    ? (
        reviews.reduce(
          (acc, review) =>
            acc + review.rating,
          0
        ) / reviews.length
      ).toFixed(1)

    : 0;
   const [calendarError, setCalendarError]
  = useState(false);
  // FECHAS OCUPADAS
  const bookedDates = [
    new Date(2026, 4, 15),
    new Date(2026, 4, 16),
    new Date(2026, 4, 20),
    new Date(2026, 4, 21)
  ];

  useEffect(() => {

    fetch("http://localhost:8080/products")
      .then(res => res.json())
      .then(data => {

        const foundCar = data.find(
          c => Number(c.id) === Number(id)
        );

        if (foundCar) {

          setCar(foundCar);

          setError(false);

        } else {

          setError(true);

        }

      })

      .catch(err => {

        console.error(err);

        setError(true);

      });

  }, [id]);

  // LINK
  const shareUrl =
    window.location.href;

  // AGREGAR REVIEW
  function addReview() {

    if(!user) {

      alert(
        "Tenés que iniciar sesión 😢"
      );

      return;
    }

    if(!newReview || rating === 0) {

      alert(
        "Completá comentario y estrellas"
      );

      return;
    }

    const today =
      new Date().toLocaleDateString();

    const review = {

      id: Date.now(),

      user: user.name,

      rating,

      comment: newReview,

      date: today

    };

    setReviews([
      review,
      ...reviews
    ]);

    setNewReview("");

    setRating(0);

  }

  function handleReserve() {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  if (!user) {

    navigate("/login", {
      state: {
        message:
          "Debés iniciar sesión para reservar."
      }
    });

    return;
  }

  navigate(`/reservation/${id}`);
}

  // ERROR
  if (error) {

    return (

      <div className="detail">

        <h2>
          No se encontró el auto 😢
        </h2>

        <button
          onClick={() => navigate(-1)}
        >

          ⬅️ Volver

        </button>

      </div>

    );
  }

  // LOADING
  if (!car) {

    return (

      <div className="detail">

        <h2>
          Cargando auto...
        </h2>

        <button
          onClick={() => navigate(-1)}
        >

          ⬅️ Volver

        </button>

      </div>

    );
  }

  return (

    <div className="product-detail">

      {/* HEADER */}
      <div className="detail-header">

        <div>

          <h2 className="title">
            {car.name}
          </h2>

          <p className="category">

            🚗 {car.category || "General"}

          </p>

        </div>

        <button
          className="home-btn"
          onClick={() => navigate("/")}
        >

          ⬅️ Inicio

        </button>

      </div>

      {/* TOP SECTION */}
      <div className="top-section">

        {/* GALERÍA */}
        <div className="gallery">

          <img
            className="main-img"
            src={car.images?.[0] || car.image}
            alt={car.name}
            onClick={() =>
              setSelectedImage(
                car.images?.[0] || car.image
              )
            }
          />

          <div className="grid">

            {car.images?.slice(1).map((img, i) => (

              <img
                key={i}
                src={img}
                alt="auto"
                onClick={() =>
                  setSelectedImage(img)
                }
              />

            ))}

          </div>

        </div>

        {/* INFO */}
        <div className="side-info">

          <h1>
            {car.name}
          </h1>

          <p>

            📍 {car.location ||
            "Ubicación no disponible"}

          </p>

          <p>

            🚗 {car.category || "General"}

          </p>

          <h2>

            ${car.price} por día

          </h2>

          <p>

            {car.longDescription ||
            car.description}

          </p>

          {/* SHARE */}
          <button
            className="share-btn"
            onClick={() =>
              setShowShare(true)
            }
          >

            📤 Compartir

          </button>

          {/* FEATURES */}
          {car.features &&
          car.features.length > 0 && (

            <div className="features">

              <h3>
                Características
              </h3>

              <div className="features-grid">

                {car.features.map((feature) => (

                  <div
                    className="feature-card"
                    key={feature.id}
                  >

                    <span className="feature-icon">

                      {feature.icon}

                    </span>

                    <p>
                      {feature.name}
                    </p>

                  </div>

                ))}

              </div>

            </div>

          )}

          {/* DISPONIBILIDAD */}
          <div className="availability">

            <h2>
              Disponibilidad
            </h2>

            <p>
              Seleccioná tus fechas
              de reserva.
            </p>

            <div className="calendar-container">

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
                className="calendar-input"
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
                className="calendar-input"
              />

            </div>

            <p className="calendar-info">
              {calendarError && (

  <div className="calendar-error">

    <p>
      No se pudo obtener la disponibilidad
      en este momento 😢
    </p>

    <button
      onClick={() =>
        window.location.reload()
      }
    >

      Reintentar

    </button>

  </div>

)}

              🔴 Fechas ocupadas no
              disponibles.

            </p>

          </div>

          <button className="reserve-btn" onClick={handleReserve}>

            Reservar

          </button>

          {/* POLÍTICAS */}
          <div className="policies">

            <h2>
              Políticas
            </h2>

            <div className="policy-grid">

              <div className="policy-card">

                <h3>
                  Normas del vehículo
                </h3>

                <p>
                  No se permite fumar
                  dentro del vehículo.
                </p>

              </div>

              <div className="policy-card">

                <h3>
                  Seguridad
                </h3>

                <p>
                  El cinturón es
                  obligatorio.
                </p>

              </div>

              <div className="policy-card">

                <h3>
                  Cancelaciones
                </h3>

                <p>
                  Cancelación gratuita
                  hasta 24hs antes.
                </p>

              </div>

            </div>

          </div>

          {/* REVIEWS */}
          <div className="reviews">

            <h2>
              Valoraciones
            </h2>

            <div className="average-rating">

              ⭐ {averageRating}

              <span>
                ({reviews.length} reseñas)
              </span>

            </div>

            {/* FORM */}

            <div className="review-form">

              <h3>
                Dejá tu reseña
              </h3>

              <div className="stars">

                {[1,2,3,4,5].map((star) => (

                  <span
                    key={star}
                    className={
                      star <= rating
                        ? "star active"
                        : "star"
                    }
                    onClick={() =>
                      setRating(star)
                    }
                  >

                    ★

                  </span>

                ))}

              </div>

              <textarea
                placeholder="Escribí tu opinión..."
                value={newReview}
                onChange={(e) =>
                  setNewReview(
                    e.target.value
                  )
                }
              />

              <button
                className="review-btn"
                onClick={addReview}
              >

                Publicar reseña

              </button>

            </div>

            {/* LISTA */}

            <div className="reviews-list">

              {reviews.map((review) => (

                <div
                  className="review-card"
                  key={review.id}
                >

                  <div className="review-top">

                    <h4>
                      {review.user}
                    </h4>

                    <span>
                      {review.date}
                    </span>

                  </div>

                  <div className="review-stars">

                    {"★".repeat(review.rating)}

                  </div>

                  <p>
                    {review.comment}
                  </p>

                </div>

              ))}

            </div>

          </div>

          {/* SHARE MODAL */}
          {showShare && (

            <div
              className="share-modal"
              onClick={() =>
                setShowShare(false)
              }
            >

              <div
                className="share-box"
                onClick={(e) =>
                  e.stopPropagation()
                }
              >

                <h2>
                  Compartir producto
                </h2>

                <img
                  src={car.image}
                  alt={car.name}
                  className="share-image"
                />

                <p>
                  {car.name}
                </p>
                <textarea
             className="share-textarea"
              value={shareMessage}
              onChange={(e) =>
             setShareMessage(e.target.value)
                    }
/>
                <div className="share-buttons">

                  <a
                    href={`https://wa.me/?text=${shareMessage}${shareUrl}`}
                    target="_blank"
                  >

                    WhatsApp

                  </a>

                  <a
                    href={`https://twitter.com/intent/tweet?url=${shareMessage}${shareUrl}`}
                    target="_blank"
                  >

                    Twitter

                  </a>

                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                    target="_blank"
                  >

                    Facebook

                  </a>

                </div>

                <button
                  className="close-share"
                  onClick={() =>
                    setShowShare(false)
                  }
                >

                  Cerrar

                </button>

              </div>

            </div>

          )}

          {/* MODAL IMAGEN */}
          {selectedImage && (

            <div
              className="image-modal"
              onClick={() =>
                setSelectedImage(null)
              }
            >

              <img
                src={selectedImage}
                alt="auto grande"
                className="modal-img"
              />

            </div>

          )}

        </div>

      </div>

    </div>

  );
}

export default ProductDetail;