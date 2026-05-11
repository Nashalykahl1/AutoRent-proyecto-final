import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import ProductCard from "../components/ProductCard";

function Home() {

  const navigate = useNavigate();

  const [cars, setCars] = useState([]);

  const [categories, setCategories] = useState([]);

  // RECOMENDACIONES
  useEffect(() => {

    fetch("http://localhost:8080/products/recommended")
      .then(res => res.json())
      .then(data => setCars(data));

  }, []);

  // CATEGORÍAS
  useEffect(() => {

    fetch("http://localhost:8080/categories")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error(err));

  }, []);

  return (

    <main className="home">

      {/* BUSCADOR */}
      <section className="search">

        <h2>Buscá tu auto ideal 🚗</h2>

        <div className="search-bar">

          <input
            type="text"
            placeholder="¿Qué auto estás buscando?"
          />

          <button>
            Buscar
          </button>

        </div>

      </section>

      {/* CATEGORÍAS */}
      <section className="categories">

        <h3>Categorías</h3>

        <div className="category-grid">

          {categories.map(category => (

            <div
              key={category.id}
              className="category-card"
              onClick={() =>
                navigate(`/category/${category.title}`)
              }
            >

              <img
                src={category.image}
                alt={category.title}
              />

              <h4>{category.title}</h4>

            </div>

          ))}

        </div>

      </section>

      {/* RECOMENDACIONES */}
      <section className="recommendations">

        <h3>Recomendaciones</h3>

        <div className="card-grid">

          {cars.map((car) => (

            <ProductCard
              key={car.id}
              car={car}
            />

          ))}

        </div>

      </section>

    </main>
  );
}

export default Home;