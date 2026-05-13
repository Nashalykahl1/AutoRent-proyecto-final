import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import ProductCard from "../components/ProductCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Home() {

  const navigate = useNavigate();

  const [cars, setCars] = useState([]);

  const [allCars, setAllCars] = useState([]);

  const [categories, setCategories]
    = useState([]);
    const [startDate, setStartDate] = useState(null);

const [endDate, setEndDate] = useState(null);

  const [search, setSearch]
    = useState("");

  const [suggestions, setSuggestions]
    = useState([]);

  // PRODUCTOS
  useEffect(() => {

    fetch("http://localhost:8080/products/recommended")
      .then(res => res.json())
      .then(data => {

        setCars(data);

        setAllCars(data);

      });

  }, []);

  // CATEGORÍAS
  useEffect(() => {

    fetch("http://localhost:8080/categories")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error(err));

  }, []);

  // BUSCAR
  function handleSearch(e) {

    const value = e.target.value;

    setSearch(value);

    // SUGERENCIAS
    const filteredSuggestions =
      allCars.filter(car =>

        car.name
          .toLowerCase()
          .includes(value.toLowerCase())

      );

    setSuggestions(filteredSuggestions);

  }

  // FILTRAR
  function searchCars() {

    const filteredCars =
      allCars.filter(car =>

        car.name
          .toLowerCase()
          .includes(search.toLowerCase())

      );

    setCars(filteredCars);

  }

  return (

    <main className="home">

      {/* BUSCADOR */}
      <section className="search">

        <h2>
          Buscá tu auto ideal 🚗
        </h2>

        <p className="search-text">

          Encontrá el vehículo perfecto
          para tu próxima aventura.

        </p>

        <div className="search-bar">

          <input
            type="text"
            placeholder="¿Qué auto estás buscando?"
            value={search}
            onChange={handleSearch}
          />

<div className="search-dates">

  <DatePicker
    selected={startDate}
    onChange={(date) => setStartDate(date)}
    selectsStart
    startDate={startDate}
    endDate={endDate}
    placeholderText="Fecha inicio"
    className="date-input"
  />

  <DatePicker
    selected={endDate}
    onChange={(date) => setEndDate(date)}
    selectsEnd
    startDate={startDate}
    endDate={endDate}
    minDate={startDate}
    placeholderText="Fecha fin"
    className="date-input"
  />

</div>

          <button onClick={searchCars}>

            Buscar

          </button>

        </div>

        {/* SUGERENCIAS */}
        {search && suggestions.length > 0 && (

          <div className="suggestions">

            {suggestions.map(car => (

              <div
                key={car.id}
                className="suggestion-item"
                onClick={() => {

                  setSearch(car.name);

                  setCars([car]);

                  setSuggestions([]);

                }}
              >

                {car.name}

              </div>

            ))}

          </div>

        )}

      </section>

      {/* CATEGORÍAS */}
      <section className="categories">

        <h3>
          Categorías
        </h3>

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

              <h4>
                {category.title}
              </h4>

            </div>

          ))}

        </div>

      </section>

      {/* RECOMENDACIONES */}
      <section className="recommendations">

        <h3>
          Recomendaciones
        </h3>

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