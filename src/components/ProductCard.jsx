import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function ProductCard({ car }) {

  const navigate = useNavigate();

  const reviewsData = {

  1: {
    rating: 4.9,
    reviews: 32,
    comment:
      "Muy cómodo y elegante"
  },

  2: {
    rating: 4.7,
    reviews: 18,
    comment:
      "Excelente manejo"
  },

  3: {
    rating: 5.0,
    reviews: 41,
    comment:
      "Increíble experiencia"
  },

  4: {
    rating: 4.6,
    reviews: 12,
    comment:
      "Muy recomendable"
  }

};

const review =
  reviewsData[car.id] || {

    rating: 4.8,

    reviews: 20,

    comment:
      "Excelente auto"

  };

  const [isFavorite, setIsFavorite]
    = useState(false);

  // VERIFICAR FAVORITO
  useEffect(() => {

    const favorites =
      JSON.parse(
        localStorage.getItem("favorites")
      ) || [];

    const exists = favorites.find(
      fav => fav.id === car.id
    );

    setIsFavorite(!!exists);

  }, [car.id]);

  // FAVORITOS
  function toggleFavorite() {

    const user =
      JSON.parse(localStorage.getItem("user"));

    let favorites =
      JSON.parse(
        localStorage.getItem("favorites")
      ) || [];

    // SACAR FAVORITO
    if(isFavorite) {

      favorites = favorites.filter(
        fav => fav.id !== car.id
      );

      localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
      );

      setIsFavorite(false);

      return;
    }

    // AGREGAR FAVORITO
    favorites.push(car);

    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );

    setIsFavorite(true);

  }

  return (

    <div className="card">

      {/* FAVORITO */}
      <button
        className="favorite-btn"
        onClick={toggleFavorite}
      >

        {isFavorite ? "❤️" : "🤍"}

      </button>

      <img
        src={car.image}
        alt={car.name}
      />

      <div className="card-body">

        <div className="card-info">

          <h4>
            {car.name}
          </h4>

          <p>
            {car.description}
          </p>

          <div className="card-rating">

       ⭐{review.rating}

  <span>
  ({review.reviews} reseñas)
  </span>

</div>

<p className="mini-review">

 “{review.comment}”

</p>

        </div>

        <div className="card-side">

          <span className="price">

            ${car.price} por día

          </span>

          <button
            onClick={() =>
              navigate(`/product/${car.id}`)
            }
          >

            Ver más

          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;