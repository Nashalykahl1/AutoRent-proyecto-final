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

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  if(!user) return;

  fetch(
    `http://localhost:8080/favorites/${user.id}`
  )
    .then(res => res.json())

    .then(data => {

      const exists = data.find(
        fav => fav.product.id === car.id
      );

      setIsFavorite(!!exists);

    });

}, [car.id]);

// FAVORITOS
function toggleFavorite() {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  if(!user) return;

  // ELIMINAR
  if(isFavorite) {

    fetch(
      `http://localhost:8080/favorites/${user.id}`
    )
      .then(res => res.json())

      .then(data => {

        const favorite =
          data.find(
            fav =>
              fav.product.id === car.id
          );

        if(favorite) {

          fetch(
           ` http://localhost:8080/favorites/${favorite.id}`,
            {
              method: "DELETE"
            }
          )
            .then(() => {

              setIsFavorite(false);

            });

        }

      });

    return;
  }

  // AGREGAR
  fetch(
    "http://localhost:8080/favorites",
    {

      method: "POST",

      headers: {
        "Content-Type":
          "application/json"
      },

      body: JSON.stringify({

        user: {
          id: user.id
        },

        product: {
          id: car.id
        }

      })

    }
  )
    .then(() => {

      setIsFavorite(true);

    });
   }
   return( 
     <div className="card">
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