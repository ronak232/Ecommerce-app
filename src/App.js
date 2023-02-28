import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Components/Navbar";
import Home from "./Components/Home";
import Account from "./Components/Account";
import Blog from "./Components/Blog";
import Shop from "./Components/Shop";
import Pages from "./Components/Pages";
import Cart from "./ReuseComp/CartComponents/Cart";
// import LogoSlider from "./Components/LogoSlider";
import Footer from "./Components/Footer";

function App() {
  const [cartItems, setCartItems] = useState(
    // Check  for the cart have items in it or not....
    JSON.parse(localStorage.getItem("cartProducts")) || []
  );
  // console.log(cartItems);

  const handleAddProduct = (product) => {
    // console.log(product);
    setCartItems([...cartItems, { ...product, quantity: 1 }]);
  };

  // Removing item from
  const removeAddedItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(cartItems));
    // setcartUpdate(cartItems);
  }, [cartItems]);

  // Adding Quantity of product

  // Increment the value
  const handleIncrement = (id) => {
    setCartItems((cartItems) =>
      cartItems.map((item) =>
        id === item.id
          ? { ...item, quantity: item.quantity + (item.quantity < 20 ? 1 : 0) }
          : item
      )
    );
  };
  const handleDecrement = (id) => {
    setCartItems((cartItems) =>
      cartItems.map((item) =>
        id === item.id
          ? { ...item, quantity: item.quantity - (item.quantity > 1 ? 1 : 0) }
          : item
      )
    );
  };

  //

  return (
    <>
      <Router>
        <NavBar count={cartItems.length} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route
            path="/shop"
            element={
              <Shop handleAddProduct={handleAddProduct} cartItems={cartItems} />
            }
          />
          <Route path="/blog" element={<Blog />} />
          <Route path="/pages" element={<Pages />} />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
                onRemove={removeAddedItem}
              />
            }
          />
        </Routes>

        {<Footer />}
      </Router>
    </>
  );
}

export default App;
