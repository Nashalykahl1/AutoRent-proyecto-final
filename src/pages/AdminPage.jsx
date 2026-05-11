import { useState, useEffect } from "react";
import "./AdminPage.css";
import { useNavigate } from "react-router-dom";

function AdminPage() {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const [users, setUsers] = useState([]);

  const [features, setFeatures] = useState([]);

  const [editingFeature, setEditingFeature]
    = useState(null);

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

  // TRAER DATOS
  useEffect(() => {

    fetchProducts();

    fetchUsers();

    fetchFeatures();

  }, []);

  // PRODUCTOS
  function fetchProducts() {

    fetch("http://localhost:8080/products")
      .then(res => res.json())
      .then(data => setProducts(data));

  }

  // USUARIOS
  function fetchUsers() {

    fetch("http://localhost:8080/users")
      .then(res => res.json())
      .then(data => setUsers(data));

  }

  // FEATURES
  function fetchFeatures() {

    fetch("http://localhost:8080/features")
      .then(res => res.json())
      .then(data => setFeatures(data));

  }

  // INPUT PRODUCTO
  function handleChange(e) {

    const {
      name,
      value,
      type,
      checked
    } = e.target;

    setProduct({

      ...product,

      [name]:
        type === "checkbox"
          ? checked
          : value

    });

  }

  // INPUT CATEGORY
  function handleCategoryChange(e) {

    const { name, value } = e.target;

    setCategory({

      ...category,

      [name]: value

    });

  }

  // INPUT FEATURE
  function handleFeatureChange(e) {

    const { name, value } = e.target;

    setFeature({

      ...feature,

      [name]: value

    });

  }

  // AGREGAR PRODUCTO
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

          throw new Error(
            "Ese producto ya existe"
          );
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

  // AGREGAR CATEGORY
  function handleCategorySubmit(e) {

    e.preventDefault();

    fetch("http://localhost:8080/categories", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(category)

    })

      .then(() => {

        alert("Categoría agregada 😎");

        setCategory({

          title: "",
          description: "",
          image: ""

        });

      });

  }

  // FEATURES
  function handleFeatureSubmit(e) {

    e.preventDefault();

    // EDITAR
    if(editingFeature) {

      fetch(
        `http://localhost:8080/features/${editingFeature.id}`,
        {

          method: "PUT",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(feature)

        }
      )

        .then(() => {

          alert("Característica editada 😎");

          fetchFeatures();

          setFeature({

            name: "",
            icon: ""

          });

          setEditingFeature(null);

        });

      return;
    }

    // CREAR
    fetch("http://localhost:8080/features", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(feature)

    })

      .then(() => {

        alert("Característica agregada 😎");

        fetchFeatures();

        setFeature({

          name: "",
          icon: ""

        });

      });

  }

  // ELIMINAR PRODUCTO
  function deleteProduct(id) {

    fetch(
      `http://localhost:8080/products/${id}`,
      {
        method: "DELETE"
      }
    )
      .then(() => fetchProducts());

  }

  // ELIMINAR FEATURE
  function deleteFeature(id) {

    fetch(
      `http://localhost:8080/features/${id}`,
      {
        method: "DELETE"
      }
    )
      .then(() => fetchFeatures());

  }

  // ADMIN
  function toggleAdmin(user) {

    fetch(
      `http://localhost:8080/users/${user.id}`,
      {

        method: "PUT",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({

          ...user,

          admin: !user.admin

        })

      }
    )
      .then(() => fetchUsers());

  }

  // MOBILE
  if (window.innerWidth < 768) {

    return (

      <div className="mobile-message">

        <h2>
          El panel de administración
          no está disponible
          en móviles 📱
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

        ← Volver al inicio

      </button>

      <h1>
        Panel Administrador
      </h1>

      {/* CATEGORÍAS */}
      <h2>Agregar categoría</h2>

      <form onSubmit={handleCategorySubmit}>

        <input
          type="text"
          name="title"
          placeholder="Título"
          value={category.title}
          onChange={handleCategoryChange}
        />

        <input
          type="text"
          name="description"
          placeholder="Descripción"
          value={category.description}
          onChange={handleCategoryChange}
        />

        <input
          type="text"
          name="image"
          placeholder="Imagen"
          value={category.image}
          onChange={handleCategoryChange}
        />

        <button type="submit">

          Agregar categoría

        </button>

      </form>

      <hr />

      {/* FEATURES */}
      <h2>Características</h2>

      <form onSubmit={handleFeatureSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={feature.name}
          onChange={handleFeatureChange}
        />

        <input
          type="text"
          name="icon"
          placeholder="Icono"
          value={feature.icon}
          onChange={handleFeatureChange}
        />

        <button type="submit">

          {editingFeature
            ? "Guardar cambios"
            : "Agregar característica"}

        </button>

      </form>

      {features.map(feature => (

        <div
          className="product-admin"
          key={feature.id}
        >

          <h3>

            {feature.icon}
            {" "}
            {feature.name}

          </h3>

          <div className="feature-buttons">

            <button
              onClick={() => {

                setFeature({

                  name: feature.name,

                  icon: feature.icon

                });

                setEditingFeature(feature);

              }}
            >

              Editar

            </button>

            <button
              onClick={() =>
                deleteFeature(feature.id)
              }
            >

              Eliminar

            </button>

          </div>

        </div>

      ))}

      <hr />

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