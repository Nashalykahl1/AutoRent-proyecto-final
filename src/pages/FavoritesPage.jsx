import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "./FavoritesPage.css";

function FavoritesPage() {

  const [favorites, setFavorites]
    = useState([]);

  useEffect(() => {

    const savedFavorites =
      JSON.parse(
        localStorage.getItem("favorites")
      ) || [];

    setFavorites(savedFavorites);

  }, []);

  return (

    <div className="favorites-page">

      <h1>
        Mis Favoritos ❤️
      </h1>

      {favorites.length === 0 ? (

        <p>
          No tenés favoritos guardados.
        </p>

      ) : (

        <div className="card-grid">

          {favorites.map(car => (

            <ProductCard
              key={car.id}
              car={car}
            />

          ))}

        </div>

      )}

    </div>

  );
}

export default FavoritesPage;