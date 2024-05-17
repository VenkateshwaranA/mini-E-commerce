import "./App.css";
import Footer from "./component/Footer";
import Header from "./component/Header";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
 import "react-toastify/dist/ReactToastify.css";
import Cart from "./pages/Cart";
function App() {
  const [cartItems, setCartItems] = useState([]);
  return (
    <div className="App">
      <Router>
        <div>
          <ToastContainer position="top-center" theme="dark" />
          <Header cartItems={cartItems} />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/search" element={<Home />}></Route>
            <Route
              path="/product/:id"
              element={
                <ProductDetails
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                />
              }
            ></Route>
            <Route
              path="cart"
              element={
                <Cart
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                />
              }
            ></Route>
          </Routes>
        </div>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
