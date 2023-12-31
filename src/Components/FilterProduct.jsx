import { useCallback, useContext, useEffect } from "react";
import { Button } from "../Styles/Button.style";
import { BsCartFill } from "react-icons/bs";
import { ThemeContext } from "../hooks/ContextApi";

function FilterProduct({ setcartFilter, allProducts }) {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  // To filter only the product categories
  const allCategories = [
    "all",
    ...new Set(allProducts.flat().map((item) => item.category)),
  ];

  // To calculate the maximum price of the product.
  const productPriceMaxValue = allProducts.reduce(
    (prev, curr) => (prev.price > curr.price ? prev : curr),
    1
  );

  // To calculate the minimum price of the product.
  const productPriceMinValue = allProducts.reduce(
    (prev, curr) => (prev.price < curr.price ? prev : curr),
    1
  );

  const filterProductItems = useCallback(
    (category) => {
      if (category === "all") {
        return setcartFilter(allProducts.flat());
      }
      const filterCategory = allProducts
        .flat()
        .filter((items) => items?.category === category);
      setcartFilter(filterCategory);
    },
    [allProducts, setcartFilter]
  );

  useEffect(() => {
    filterProductItems();
  }, [filterProductItems]);

  return (
    <aside className="products__filter-category">
      <div className="products__filter-category--options">
        <div className="products__filter-category--options-dropdown">
          <h3>Categories</h3>
          <div className="products__filter-category--options-dropdown-items">
            {allCategories.map((category, index) => {
              return (
                <Button
                  color={darkMode ? "white" : "black"}
                  display="flex"
                  fontSize="12px"
                  padding="8px"
                  width="100%"
                  bgColor="none"
                  key={index}
                  onClick={() => filterProductItems(category)}
                >
                  {category}
                </Button>
              );
            })}
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
