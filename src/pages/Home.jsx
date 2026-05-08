import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 👈 IMPORTANTE
import "./Home.css";
import ProductCard from "../components/ProductCard";

function Home() {

  const navigate = useNavigate(); // 👈 IMPORTANTE

  const [cars, setCars] = useState([]);

  useEffect(() => {
    // recomendaciones
    fetch("http://localhost:8080/products/recommended")
      .then(res => res.json())
      .then(data => setCars(data));
  }, []);

  return (
    <main className="home">

      {/* BUSCADOR */}
      <section className="search">
        <h2>Buscá tu auto ideal 🚗</h2>
        <div className="search-bar"></div>
        <input type="text" placeholder="¿Qué auto estás buscando?" />
        <button>Buscar</button>
      </section>

      {/* CATEGORÍAS */}
      <section className="categories">
        <h3>Categorías</h3>

        <div className="category-grid">

          <div className="category-card" onClick={() => navigate("/category/SUV")}>
            <img src="https://i.pinimg.com/736x/5b/36/e4/5b36e4330651b370958d1fd36896bc44.jpg" />
            <h4>SUV</h4>
          </div>

          <div className="category-card" onClick={() => navigate("/category/Sedán")}>
            <img src="https://i.pinimg.com/736x/e9/60/16/e96016651f43dbb01d1db64cd69f8e65.jpg" />
            <h4>Sedán</h4>
          </div>

          <div className="category-card" onClick={() => navigate("/category/Deportivo")}>
            <img src="https://i.pinimg.com/736x/da/3d/2a/da3d2a87e6a1f6a580f255bf676bc949.jpg" />
            <h4>Deportivo</h4>
          </div>

          <div className="category-card" onClick={() => navigate("/category/Pickup")}>
            <img src="https://i.pinimg.com/736x/77/cd/87/77cd87f427c9df651524785345c5a37e.jpg" />
            <h4>Pickup</h4>
          </div>

        </div>
      </section>

      {/* RECOMENDACIONES */}
      <section className="recommendations">
        <h3>Recomendaciones</h3>

        <div className="card-grid">
          {cars.map((car) => (
            <ProductCard key={car.id} car={car} />
          ))}
        </div>
      </section>

    </main>
  );
}

export default Home;