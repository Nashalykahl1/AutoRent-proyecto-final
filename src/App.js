import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import ProductDetail from "./pages/ProductDetail";
import CategoryPage from "./pages/CategoryPage";
import AdminPage from "./pages/AdminPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FavoritesPage from "./pages/FavoritesPage";
import ReservationPage from "./pages/ReservationPage";
import ReservationSuccess from "./pages/ReservationSuccess";
import HistoryPage from "./pages/HistoryPage";
import WhatsAppButton from "./components/WhatsAppButton";



function App() {
  return (
    <BrowserRouter> {/* 👈 MUY IMPORTANTE */}
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/favorites"element={<FavoritesPage />}/>
        <Route path="/reservation/:id" element={<ReservationPage />} />
        <Route path="/reservation-success" element={<ReservationSuccess />} />
        <Route path="/history" element={<HistoryPage />}
/>
      </Routes>

      <Footer />
   <WhatsAppButton />
    </BrowserRouter>
  );
}

export default App;
