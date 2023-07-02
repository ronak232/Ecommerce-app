import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Components/Navbar";
import Home from "./Components/Home";
import Account from "./Components/Account";
import Blog from "./Components/Blog";
import Shop from "./Components/Shop";
import Pages from "./Components/Pages";
import Cart from "./ReuseComp/CartComponents/Cart";
import Footer from "./Components/Footer";
import Themetoggle from "./ReuseComp/DarkModeToggle/Themetoggle";
import { ThemeContext } from "./hooks/ContextApi";
import { useContext } from "react";
import ProductDetails from "./Pages/ProductDetails";

function App() {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  const [cartItems, setCartItems] = useState(
    // Check  for the cart have items in it or not....
    JSON.parse(localStorage.getItem("cartProducts")) || []
  );
  const [allProducts, setAllProducts] = useState([]);
  // const [loader, setLoader] = useState(true);

  const [cartFilter, setcartFilter] = useState([]);

  const handleAddProduct = (product) => {
    const ifProductPresent = cartItems.find((item) => item.id === product.id);
    // console.log(ifProductPresent)

    if (ifProductPresent) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...ifProductPresent, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    // console.log(quantity)
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

  const APICall = () => {
    axios
      .get("https://dummyjson.com/products")
      .then((response) => response.data.products)
      .then((data) => {
        setAllProducts(data);
        setcartFilter(data);
        // setLoader(true);
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    APICall();
  }, []);

  return (
    <div
      className={darkMode ? "dark" : ""}
    // style={{
    //   backgroundColor: darkMode ? "#222" : "white",
    //   color: darkMode && "whit",
    // }}
    >
      <Router>
        <NavBar count={cartItems.length} cartItems={cartItems} />
        <Themetoggle />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                cartFilter={cartFilter}
                disableFilterOptions={false}
                handleAddProduct={handleAddProduct}
              />
            }
          />
          <Route path="/account" element={<Account />} />
          <Route
            path="/shop"
            element={
              <Shop
                handleAddProduct={handleAddProduct}
                cartItems={cartItems}
                cartFilter={cartFilter}
                setcartFilter={setcartFilter}
                allProducts={allProducts}
              />
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
          <Route
            path="/details/:id"
            element={
              <ProductDetails
                allProducts={allProducts}
                handleAddProduct={handleAddProduct}
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
              />
            }
          />
        </Routes>

        {<Footer />}
      </Router>
    </div>
  );
}

export default App;
