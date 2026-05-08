import "./ProductCard.css";
import { useNavigate } from "react-router-dom";

function ProductCard({ car }) {
    const navigate = useNavigate();
  return (
    <div className="card">
      <img src={car.image} alt={car.name} />

     <div className="card-body">

  <div className="card-info">
    <h4>{car.name}</h4>
    <p>{car.description}</p>
  </div>

  <div className="card-side">
    <span className="price">
      ${car.price} por día
    </span>

   <button onClick={() => navigate(`/product/${car.id}`)}>
  Ver más
</button>
  </div>

</div>
    </div>
  );
}

export default ProductCard;