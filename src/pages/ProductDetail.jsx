import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ProductDetail.css";

function ProductDetail() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [error, setError] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {

    fetch("http://localhost:8080/products")
      .then(res => res.json())
      .then(data => {

        const foundCar = data.find(
          c => Number(c.id) === Number(id)
        );

        console.log("AUTO ENCONTRADO:", foundCar);

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

  // ERROR
  if (error) {
    return (
      <div className="detail">

        <h2>No se encontró el auto 😢</h2>

        <button onClick={() => navigate(-1)}>
          ⬅️ Volver
        </button>

      </div>
    );
  }

  // LOADING
  if (!car) {
    return (
      <div className="detail">

        <h2>Cargando auto...</h2>

        <button onClick={() => navigate(-1)}>
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
  setSelectedImage(car.images?.[0] || car.image)
}
          />

          <div className="grid">

            {car.images?.slice(1).map((img, i) => (

              <img
                key={i}
                src={img}
                alt="auto"
                onClick={() => setSelectedImage(img)}
              />

            ))}

          </div>

        </div>

        {/* INFO LATERAL */}
        <div className="side-info">

          <h1>{car.name}</h1>

          <p>
            📍 {car.location || "Ubicación no disponible"}
          </p>

          <p>
            🚗 {car.category || "General"}
          </p>

          <h2>
            ${car.price} por día
          </h2>

          <p>
            {car.longDescription || car.description}
          </p>

          <button className="reserve-btn">
            Reservar
          </button>

{selectedImage && (

  <div
    className="image-modal"
    onClick={() => setSelectedImage(null)}
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