import { useState, useEffect } from "react";
import "./AdminPage.css";
import { useNavigate } from "react-router-dom";

function AdminPage() {
const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    longDescription: "",
    image: "",
    images: [],
    price: "",
    category: "",
    location: "",
    recommended: false
  });

  // traer productos
  useEffect(() => {
    fetchProducts();
  }, []);

  function fetchProducts() {
    fetch("http://localhost:8080/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }

  // guardar cambios inputs
  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setProduct({
      ...product,
      [name]: type === "checkbox" ? checked : value
    });
  }

  // guardar producto
  function handleSubmit(e) {
    e.preventDefault();

    const newProduct = {
      ...product,
      price: Number(product.price),
      images: product.images.split(",")
    };

    fetch("http://localhost:8080/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newProduct)
    })
      .then(res => {
  if(!res.ok) {
    throw new Error("Ese producto ya existe");
  }
return res.json();
})
      .then(() => {
  
        alert("Producto agregado");

        fetchProducts();

        setProduct({
          name: "",
          description: "",
          longDescription: "",
          image: "",
          images: [],
          price: "",
          category: "",
          location: "",
          recommended: false
        });
      })
.catch(err => {
  alert(err.message);
});
 }
  // eliminar
  function deleteProduct(id) {
    fetch(`http://localhost:8080/products/${id}`, {
      method: "DELETE"
    })
      .then(() => fetchProducts());
  }
if (window.innerWidth < 768) {
  return (
    <div className="mobile-message">
      <h2>
        El panel de administración no está disponible en móviles 📱
      </h2>
    </div>
  );
}
  return (
    <div className="admin">

<button
  className="back-home"
  onClick={() => navigate("/")}
>
    ←  Volver al inicio
</button>
      <h1>Panel Administrador</h1>

      {/* FORMULARIO */}
      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={product.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="description"
          placeholder="Descripción"
          value={product.description}
          onChange={handleChange}
        />

        <textarea
          name="longDescription"
          placeholder="Descripción larga"
          value={product.longDescription}
          onChange={handleChange}
        />

        <input
          type="text"
          name="image"
          placeholder="Imagen principal"
          value={product.image}
          onChange={handleChange}
        />

        <input
          type="text"
          name="images"
          placeholder="Imágenes separadas por coma"
          value={product.images}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={product.price}
          onChange={handleChange}
        />

        <input
          type="text"
          name="category"
          placeholder="Categoría"
          value={product.category}
          onChange={handleChange}
        />

        <input
          type="text"
          name="location"
          placeholder="Ubicación"
          value={product.location}
          onChange={handleChange}
        />

        <label>
          Recomendado
          <input
            type="checkbox"
            name="recommended"
            checked={product.recommended}
            onChange={handleChange}
          />
        </label>

        <button type="submit">
          Agregar producto
        </button>

      </form>

      <hr />

      {/* LISTA PRODUCTOS */}

      <h2>Productos</h2>

      {products.map(product => (
        <div className="product-admin" key={product.id}>

          <p>ID: {product.id}</p>
          <h3>{product.name}</h3>

          <button onClick={() => deleteProduct(product.id)}>
            Eliminar
          </button>

        </div>
      ))}

    </div>
  );
}

export default AdminPage;