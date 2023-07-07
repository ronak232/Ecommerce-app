// import React, { useEffect, useState } from "react";
import { useEffect, useState } from "react";
import { Button } from "../Styles/Button.style";
// import { BsCartFill } from "react-icons/bs";

function FilterProduct({ setcartFilter, allProducts }) {
  const [cartCategory, setCartcategory] = useState("");

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
              // display="flex"
              fontSize="18px"
              padding="8px"
              onClick={() => setCartcategory("")}
              width="100%"
              bgColor="none"
            >
              All
            </Button>
            <Button
              // display="flex"
              fontSize="18px"
              padding="8px"
              onClick={() => setCartcategory("smartphones")}
              width="100%"
              bgColor="none"
            >
              SmartPhones
            </Button>
            <Button
              // display="flex"
              fontSize="18px"
              padding="8px"
              onClick={() => setCartcategory("laptops")}
              width="100%"
              bgColor="none"
            >
              Laptops
            </Button>
            <Button
              // display="flex"
              fontSize="18px"
              padding="8px"
              onClick={() => setCartcategory("fragrances")}
              width="100%"
              bgColor="none"
            >
              Fragrances
            </Button>
            <Button
              // display="flex"
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
    </aside>
  );
}

export default FilterProduct;
