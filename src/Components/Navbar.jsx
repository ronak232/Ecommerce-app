import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "../Sass/Style.scss";
import { HiBars3 } from "react-icons/hi2";
import { CiUser, CiSearch } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import { RiShoppingCart2Line } from "react-icons/ri";
import { MdArrowDropDown } from "react-icons/md";
import { ThemeContext } from "../hooks/ContextApi";

function NavBar({ count, cartItems, querySearch, handleSearchResult }) {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  const [mobileToggle, setmobileToggle] = useState(false);

  const toggleHandler = () => {
    setmobileToggle(!mobileToggle);
  };

  return (
    <header>
      <nav
        className="main-navbar"
        style={{ borderBottom: darkMode ? "1px solid" : "" }}
      >
        <div>
          <div className="main-navbar-container">
            <a href="/" className="main-navbar-logo">
              <img
                src="https://cartzilla.createx.studio/img/logo-dark.png"
                alt=""
              />
            </a>
            <div className="main-navbar-search">
              <form
                className=""
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <CiSearch className="main-navbar-search-icon" />
                <input
                  className="main-navbar-search-bar"
                  type="text"
                  name="search"
                  placeholder="Search for products"
                  value={querySearch}
                  onChange={(e) => handleSearchResult(e)}
                />
              </form>
            </div>
            <div className="main-navbar-productCart">
              <div className="navbar-toggle" onClick={toggleHandler}>
                <button className="navbar-toggle-btn">
                  {mobileToggle ? (
                    <RxCross1 className="smooth" />
                  ) : (
                    <HiBars3 className="smooth" />
                  )}
                </button>
              </div>
              <Link className="main-navbar-user">
                <CiUser className="main-navbar-user-icons" />
                <div className="main-navbar-user-text">
                  <h5>
                    <small>Hello, sign in</small>
                  </h5>
                  My Account
                </div>
              </Link>
              <Link to="/cart" className="main-navbar-cart-item">
                <RiShoppingCart2Line className="cart-style" />
                <span className="main-navbar-cart-item-number">{count}</span>
                <div className="main-navbar-cart-item-text">
                  <small>My Cart</small>
                  <h3>
                    $
                    {cartItems
                      .map((item) => item.price * item.quantity)
                      .reduce((total, value) => total + value, 0)}
                  </h3>
                  <MdArrowDropDown className="main-navbar-cart-item-text-arrow" />
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="main-navbar-toolbar">
          <div className="main-navbar-toolbar-container">
            <div className="main-navbar-content">
              <ul
                className={
                  mobileToggle
                    ? "navbar-expand-content-list"
                    : "main-navbar-content-list"
                }
              >
                <li className="main-navbar-content-list-items">
                  <Link className="main-navbar-content-list-item" to="/">
                    Home
                  </Link>
                </li>

                <li className="main-navbar-content-list-items">
                  <Link className="main-navbar-content-list-item" to="/account">
                    Account
                  </Link>
                </li>

                <li className="main-navbar-content-list-items">
                  <Link className="main-navbar-content-list-item" to="/shop">
                    Shop
                  </Link>
                </li>
                <li className="main-navbar-content-list-items">
                  <Link className="main-navbar-content-list-item" to="/blog">
                    Blog
                  </Link>
                </li>
                <li className="main-navbar-content-list-items">
                  <Link to="/pages" className="main-navbar-content-list-item">
                    Pages
                  </Link>
                </li>
              </ul>
            </div>
            {/* 
              <div className="navbar-toggle" onClick={toggleHandler}>
                <button className="navbar-toggle-btn">
                  {mobileToggle ? <RxCross1 /> : <HiBars3 />}
                </button>
              </div> */}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
