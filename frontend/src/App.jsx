import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";
import ScrollToTop from "./components/scroll/ScrollToTop";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import AboutMainPage from "./pages/AboutMainPage";
import ProductListMainPage from "./pages/ProductListMainPage";
import PetServiceMainPage from "./pages/PetServiceMainPage";
import ProductDescMainPage from "./pages/ProductDescMainPage";
import ContactMainPage from "./pages/ContactMainPage";
import ConsultVetPage from "./pages/ConsultVetPage";
import LoginPage from "./pages/LoginPage";
import CartMainPage from "./pages/CartMainPage";
import CheckoutMainPage from "./pages/CheckoutMainPage";
import OrderConfirmationMain from "./pages/OrderConfirmationMain";
import SearchMainPage from "./pages/SearchMainPage";


function App() {
  return (
    <>
      <Router>
        <div className="min-h-screen font-roboto">
          <main>
            <ScrollToTop />
            <Toaster position="top-right" reverseOrder={false} />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutMainPage />} />
              <Route path="/contact" element={<ContactMainPage />} />
              <Route path="/products" element={<ProductListMainPage/>} />
              <Route path="/product/:id" element={<ProductDescMainPage />} />

              <Route path="/petservices" element={<PetServiceMainPage />} />
              <Route path="/consult-a-vet" element={<ConsultVetPage />} />


          <Route path="/login" element={<LoginPage />} />
          <Route path="/cart" element={<CartMainPage/>} />
          <Route path="/checkout" element={<CheckoutMainPage/>} />
          <Route path="/order-confirmation/:orderId" element={<OrderConfirmationMain/>} />
          <Route path="/search" element={<SearchMainPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </>
  );
}

export default App;
