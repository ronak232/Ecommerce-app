// import React, { useEffect, useState } from "react";
import { useContext, useEffect, useState } from "react";
import { Button } from "../Styles/Button.style";
import { BsCartFill } from "react-icons/bs";
import { ThemeContext } from "../hooks/ContextApi";

function FilterProduct({ setcartFilter, allProducts }) {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  const [cartCategory, setCartcategory] = useState("");

  const productPriceMaxValue = allProducts.reduce(
    (prev, curr) => (prev.price > curr.price ? prev : curr),
    1
  );

  const productPriceMinValue = allProducts.reduce(
    (prev, curr) => (prev.price < curr.price ? prev : curr),
    1
  );

  useEffect(() => {
    if (cartCategory === "") {
      setcartFilter(allProducts);
      return;
    }

    const filtered = allProducts.filter((item) =>
      item.category.includes(cartCategory)
    );

    setcartFilter(filtered);
  }, [allProducts, cartCategory, setcartFilter]);

  return (
    <aside className="products__filter-category">
      <div className="products__filter-category--options">
        <div className="products__filter-category--options-dropdown">
          <h3>Categories</h3>
          <div className="products__filter-category--options-dropdown-items">
            <Button
              color={darkMode ? "white" : "black"}
              fontSize="18px"
              padding="8px"
              onClick={() => setCartcategory("")}
              width="100%"
              bgColor="none"
            >
              All
            </Button>
            <Button
              color={darkMode ? "white" : "black"}
              fontSize="18px"
              padding="8px"
              onClick={() => setCartcategory("smartphones")}
              width="100%"
              bgColor="none"
            >
              SmartPhones
            </Button>
            <Button
              color={darkMode ? "white" : "black"}
              fontSize="18px"
              padding="8px"
              onClick={() => setCartcategory("laptops")}
              width="100%"
              bgColor="none"
            >
              Laptops
            </Button>
            <Button
              color={darkMode ? "white" : "black"}
              fontSize="18px"
              padding="8px"
              onClick={() => setCartcategory("fragrances")}
              width="100%"
              bgColor="none"
            >
              Fragrances
            </Button>
            <Button
              color={darkMode ? "white" : "black"}
              fontSize="18px"
              padding="8px"
              onClick={() => setCartcategory("skincare")}
              width="100%"
              bgColor="none"
            >
              Skincare
            </Button>
          </div>
        </div>
      </div>
      <div className="product__filter-price">
        <h1>Filter by Price</h1>
        <div className="product__filter-price--range">
          <input
            type="range"
            name="price"
            // onChange={}
            max={productPriceMaxValue}
            min={productPriceMinValue}
          />
        </div>
      </div>
    </aside>
  );
}

export default FilterProduct;
