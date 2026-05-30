import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "./CategoryPage.css";

function CategoryPage() {

  const { category } = useParams();

  const navigate = useNavigate();

  const [cars, setCars] = useState([]);

  useEffect(() => {

    fetch("http://localhost:8080/products")

      .then(res => res.json())

      .then(data => {

        if (!Array.isArray(data)) return;

       const filteredCars = data.filter(
  car => car.categoryName?.toLowerCase() === category.toLowerCase()
);
  setCars(filteredCars);


      });

  }, [category]);

  return (

    <div className="category-page">

      {/* HERO */}
      <div className="category-hero">

        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >

          ⬅️ Volver

        </button>

        <h1>
          {category}
        </h1>

        <p>
          Explorá los mejores autos
          de esta categoría
        </p>

      </div>

      {/* INFO FILTRO */}
      <div className="filter-info">

        <p>

          Se encontraron
          <strong> {cars.length} </strong>
          autos en la categoría
          <strong> {category}</strong>

        </p>

        <button
          className="clear-filter"
          onClick={() => navigate("/")}
        >

          Limpiar filtro

        </button>

      </div>

      {/* SI NO HAY */}
      {cars.length === 0 && (

        <div className="empty-category">

          <h2>
            No hay autos
            en esta categoría 😢
          </h2>

        </div>

      )}

      {/* GRID */}
      <div className="category-grid">

        {cars.map(car => (

          <ProductCard
            key={car.id}
            car={car}
          />

        ))}

      </div>

    </div>

  );
}

export default CategoryPage;