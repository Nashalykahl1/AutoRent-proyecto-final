import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "./FavoritesPage.css";

function FavoritesPage() {

  const [favorites, setFavorites]
    = useState([]);

 useEffect(() => {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  if (!user) return;

  fetch(
    `http://localhost:8080/favorites/${user.id}`
  )
    .then(res => res.json())

    .then(data => {
 console.log(data);

  if (!Array.isArray(data)) {
    return;
  }


  fetch(
    "http://localhost:8080/products"
  )
    .then(res => res.json())

    .then(allProducts => {
      console.log(allProducts);
      console.log("FAVORITOS:", data);

const products = data.map(fav => {

  const found = allProducts.find(
    p => String(p.id) === String(fav.productId)
  );

  console.log("BUSCANDO:", fav.productId);
  console.log("ENCONTRADO:", found);

  return found;

});

console.log("PRODUCTS FINAL:", products);

setFavorites(products.filter(Boolean))


});

});

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