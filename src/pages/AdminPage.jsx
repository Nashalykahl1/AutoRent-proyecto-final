import { useState, useEffect } from "react";
import "./AdminPage.css";
import { useNavigate, Navigate } from "react-router-dom";

function AdminPage() {
   const navigate = useNavigate();

  // 1. VALIDACIÓN DE ADMIN (Lo primero que se ejecuta)
  const user = JSON.parse(localStorage.getItem("user"));

  // Definición de todos los estados
  const [products, setProducts] = useState([]);
   const [users, setUsers] = useState([]);
  const [features, setFeatures] = useState([]);
  const [categories, setCategories] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [editingFeature, setEditingFeature] = useState(null);

   const [feature, setFeature] = useState({
    name: "",
    icon: ""
   });

  const [category, setCategory] = useState({
     title: "",
    description: "",
    image: ""
   });

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

  // 2. EFECTOS (Solo si es admin)
  useEffect(() => {
    if (user?.admin) {
      fetchProducts();
      fetchUsers();
      fetchFeatures();
      fetchCategories();
    }
  }, []);

  // Si no es admin, cortamos la ejecución acá y redirigimos
  if (!user?.admin) {
    return <Navigate to="/" />;
  }

  // Si es mobile, mostramos el mensaje y no renderizamos el resto
  if (window.innerWidth < 768) {
    return (
      <div className="mobile-message">
        <h2>El panel de administración no está disponible en móviles 📱</h2>
      </div>
    );
  }

  
  // --- FUNCIONES DE FETCH Y HANDLERS  ---

  function fetchProducts() {
   fetch("http://localhost:8080/products")
      .then(res => res.json())
      .then(data => setProducts(data));
   }

   function fetchUsers() {
    fetch("http://localhost:8080/users")
      .then(res => res.json())
      .then(data => setUsers(data));
   }
 
  function fetchFeatures() {
     fetch("http://localhost:8080/features")
      .then(res => res.json())
      .then(data => setFeatures(data));
   }

   function fetchCategories() {
    fetch("http://localhost:8080/categories")
      .then(res => res.json())
       .then(data => setCategories(data));
  }
   
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setProduct({
       ...product,
      [name]: type === "checkbox" ? checked : value
    });
   }

   function handleCategoryChange(e) {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  }

   function handleFeatureChange(e) {
    const { name, value } = e.target;
    setFeature({ ...feature, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
      // VALIDACIÓN: Evita que se manden productos incompletos
    if (!product.name.trim() || !product.description.trim() || !product.price || !product.category) {
      setErrorMessage("Por favor, completá los campos obligatorios del producto ⚠️");
       setSuccessMessage("");
        window.scrollTo({
    top: 0,
    behavior: "smooth"
       });
      return; 
    }

    if (Number(product.price) <= 0) {
      setErrorMessage("El precio debe ser un número positivo 💰");
      return;
    }

    const newProduct = {
  ...product,

  images:
    product.images
      .split(",")
      .map(img => img.trim()),

  price: Number(product.price),

  category: {
    id: Number(product.category)
  },

   features: []

};
    fetch("http://localhost:8080/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct)
    })
     
     .then(res => {

    if (!res.ok) {

        return res.text().then(text => {

            throw new Error(
              text || "Error al agregar producto"
            );

        });

    }
    return res.json();
    })
      .then(() => {
        setSuccessMessage("Producto agregado correctamente 😎");
        setErrorMessage("");
         fetchProducts();
        setProduct({
          name: "", description: "", longDescription: "", image: "",
          images: [], price: "", category: "", location: "", recommended: false
        });
        fetchProducts();
      })
      .catch(err => {
        setErrorMessage(err.message);
         setSuccessMessage("");
      });
  }

   function handleCategorySubmit(e) {
    e.preventDefault();
  
    if (
  !category.title ||
  !category.description ||
  !category.image
 ) {

  setErrorMessage(
    "Completá todos los campos de categoría."
  );

  setSuccessMessage("");


  return;

}

     fetch("http://localhost:8080/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
       body: JSON.stringify(category)
     })
      .then(() => {
        setSuccessMessage("Categoría agregada 😎");
        setErrorMessage("");
        fetchCategories();
        setCategory({ title: "", description: "", image: "" });
      });
   }

   function handleFeatureSubmit(e) {
    e.preventDefault();

    if (
  !feature.name ||
  !feature.icon
    ) {

  setErrorMessage(
    "Completá todos los campos de la característica."
  );

  setSuccessMessage("");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  return;

}

    if (editingFeature) {
      fetch(`http://localhost:8080/features/${editingFeature.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(feature)
      })
        .then(() => {
          setSuccessMessage("Característica editada");
          setErrorMessage("");
          fetchFeatures();
          setFeature({ name: "", icon: "" });
          setEditingFeature(null);
         });
      return;
    }

     fetch("http://localhost:8080/features", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(feature)
     })
       .then(() => {
        setSuccessMessage("Característica agregada 😎");
        setErrorMessage("");
        fetchFeatures();
        setFeature({ name: "", icon: "" });
      });
   }
 
  function deleteProduct(id) {
    fetch(`http://localhost:8080/products/${id}`, { method: "DELETE" })
      .then(() => fetchProducts());
    }
 
  function deleteFeature(id) {
    fetch(`http://localhost:8080/features/${id}`, { method: "DELETE" })
       .then(() => fetchFeatures());
  }
 
  function deleteCategory(id, title) {
     const confirmDelete = window.confirm(
      `¿Seguro que querés eliminar la categoría ${title}?`
    );
     if (!confirmDelete) return;
    fetch(`http://localhost:8080/categories/${id}`, { method: "DELETE" })
      .then(() => {
        setSuccessMessage("Categoría eliminada 😎");
        setErrorMessage("");
         fetchCategories();
      });
   }

  function toggleAdmin(userToToggle) {
    fetch(`http://localhost:8080/users/${userToToggle.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...userToToggle, admin: !userToToggle.admin })
    })
      .then(() => fetchUsers());
   }

  return (
     <div className="admin">
      <button className="back-home" onClick={() => navigate("/")}>
        ← Volver al inicio
       </button>
      <h1>Panel Administrador</h1>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {/* CATEGORÍAS */}
      <h2>Agregar categoría</h2>
       <form onSubmit={handleCategorySubmit}>
        <input type="text" name="title" placeholder="Título" value={category.title} onChange={handleCategoryChange} />
        <input type="text" name="description" placeholder="Descripción" value={category.description} onChange={handleCategoryChange} />
        <input type="text" name="image" placeholder="Imagen" value={category.image} onChange={handleCategoryChange} required />
        <button type="submit">Agregar categoría</button>
      </form>

      {categories.map(cat => (
        <div className="product-admin" key={cat.id}>
          <h3>{cat.title}</h3>
          <p>{cat.description}</p>
          <button onClick={() => deleteCategory(cat.id, cat.title)}>Eliminar</button>
        </div>
       ))}

      <hr />

      {/* FEATURES */}
      <h2>Características</h2>
       <form onSubmit={handleFeatureSubmit}>
        <input type="text" name="name" placeholder="Nombre" value={feature.name} onChange={handleFeatureChange} />
        <input type="text" name="icon" placeholder="Icono" value={feature.icon} onChange={handleFeatureChange} />
        <button type="submit">{editingFeature ? "Guardar cambios" : "Agregar característica"}</button>
      </form>

      {features.map(f => (
        <div className="product-admin" key={f.id}>
          <h3>{f.icon} {f.name}</h3>
          <div className="feature-buttons">
            <button onClick={() => { setFeature({ name: f.name, icon: f.icon }); setEditingFeature(f); }}>Editar</button>
            <button onClick={() => deleteFeature(f.id)}>Eliminar</button>
           </div>
        </div>
       ))}
      
           {/* FORMULARIO PRODUCTO */}
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

      {/* USUARIOS */}
      <h2>Usuarios</h2>

      {users.map(user => (

        <div
          className="product-admin"
          key={user.id}
        >

          <h3>
            {user.name}
          </h3>

          <p>
            {user.email}
          </p>

          <p>

            {user.admin
              ? "Administrador"
              : "Usuario"}

          </p>

          <button
            onClick={() =>
              toggleAdmin(user)
            }
          >

            {user.admin
              ? "Quitar admin"
              : "Hacer admin"}

          </button>

        </div>

      ))}

      <hr />

      {/* PRODUCTOS */}
      <h2>Productos</h2>

      {products.map(product => (

        <div
          className="product-admin"
          key={product.id}
        >

          <p>
            ID: {product.id}
          </p>

          <h3>
            {product.name}
          </h3>

          <button
            onClick={() =>
              deleteProduct(product.id)
            }
          >

            Eliminar

          </button>

        </div>

      ))}

    </div>

  );
}


export default AdminPage;