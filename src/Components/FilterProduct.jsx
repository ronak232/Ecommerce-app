import { useCallback, useContext, useEffect } from "react";
import { Button } from "../Styles/Button.style";
import { BsCartFill } from "react-icons/bs";
import { ThemeContext } from "../hooks/ContextApi";

function FilterProduct({ setcartFilter, allProducts }) {
  const theme = useContext(ThemeContext);
  const darkMode = theme?.state?.darkMode;

  // To filter only the product categories
  const allCategories = [
    "all",
    ...new Set(allProducts?.flat()?.map((item) => item.category)), //flat() method is used to flatten the paginated arrays into a single array before applying the filtering logic.
  ];

  // To calculate the maximum price of the product.
  const productPriceMaxValue = allProducts?.reduce(
    (prev, curr) => (prev.price > curr.price ? prev : curr),
    1
  );

  // To calculate the minimum price of the product.
  const productPriceMinValue = allProducts?.reduce(
    (prev, curr) => (prev.price < curr.price ? prev : curr),
    1
  );

  // to avoid running filterProductItems for every re-render
  // useCallback hook to memoize the function and only recreate it when its dependencies change.
  // This helps to optimize performance by preventing unnecessary re-creations of the function.
  const filterProductItems = useCallback(
    (category) => {
      if (category === "all") {
        const allProductsCombined = allProducts.reduce(
          (acc, page) => acc.concat(page),
          []
        );
        return setcartFilter(allProductsCombined);
      }
      const filterCategory = allProducts
        ?.flat()
        ?.filter((items) => items?.category === category);
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
            {allCategories?.map((category, index) => {
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
