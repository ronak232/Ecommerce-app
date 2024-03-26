import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Components/Navbar";
import Home from "./Pages/Home";
import Account from "./Pages/Account";
import Blog from "./Pages/Blog";
import Shop from "./Components/Shop";
import Pages from "./Components/Pages";
import Cart from "./Pages/Cart";
import Footer from "./Components/Footer";
import Themetoggle from "./ReuseComp/DarkModeToggle/Themetoggle";
import { ThemeContext } from "./hooks/ContextApi";
import { useContext } from "react";
import ProductDetails from "./Pages/ProductDetails";
import paginate from "./utils/paginate";
import UserRegistration from "./Pages/UserRegistration";
import LoginUser from "./Pages/Login";

function App() {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const [allProducts, setAllProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [cartItems, setCartItems] = useState(
    // Check  for the cart have items in it or not....
    JSON.parse(localStorage.getItem("cartProducts")) || []
  );

  const [cartFilter, setcartFilter] = useState([]);

  // Search product hooks
  const [querySearch, setQuerySearch] = useState("");

  const [productSearch, setProductSearch] = useState([]);

  const handleAddProduct = (product) => {
    const ifProductPresent = cartItems.find((item) => item.id === product.id);

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
  };

  // Removing item from
  const removeAddedItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(cartItems));
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
      .get("https://dummyjson.com/products?limit=100")
      .then((response) => response.data.products)
      .then((data) => {
        setAllProducts(paginate(data));
        setcartFilter(paginate(data));
        setProductSearch(data);
        setLoading(false);
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    APICall();
  }, []);

  return (
    <div className={darkMode ? "dark" : ""}>
      <Router>
        <NavBar
          count={cartItems.length}
          cartItems={cartItems}
          querySearch={querySearch}
          setQuerySearch={setQuerySearch}
          // handleSearchProduct={handleSearchProduct}
        />
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
                querySearch={querySearch}
                productSearch={productSearch}
                loading={loading}
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
          <Route path="/register" element={<UserRegistration/>}/>
          <Route path="/login" element={<LoginUser/>}/>
        </Routes>
        {<Footer />}
      </Router>
    </div>
  );
}

export default App;
