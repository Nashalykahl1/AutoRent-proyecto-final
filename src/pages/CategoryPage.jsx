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

        const filtered = data.filter(
          car =>
            car.category &&
            car.category.toLowerCase() === category.toLowerCase()
        );

        setCars(filtered);
      });
  }, [category]);

  return (
    <div className="category-page">

      {/* HEADER */}
      <div className="category-hero">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ⬅️ Volver
        </button>

        <h1>{category}</h1>
        <p>Explorá los mejores autos de esta categoría</p>
      </div>

      {/* GRID */}
      <div className="category-grid">
        {cars.map(car => (
          <ProductCard key={car.id} car={car} />
        ))}
      </div>

    </div>
  );
}

export default CategoryPage;