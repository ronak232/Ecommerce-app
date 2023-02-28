import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "../Styles/Button.style";
import Spinner from "../ReuseComp/Loader/Loading";
import Rating from "../ReuseComp/Rating/Rating";
import { FiShoppingCart } from "react-icons/fi";
import FilterProduct from "./FilterProduct";
import MoreIems from "../ReuseComp/CartComponents/MoreIems";

function Shop({ handleAddProduct, disableFilterOptions }) {
  const [allProducts, setAllProducts] = useState([]);
  // Loading State
  const [loader, setLoader] = useState(false);
  // Loading More Items State
  const [visibleItems, setvisibleItems] = useState(8);

  const [cartfilter, setcartFilter] = useState([]);

  const [cartCategory, setCartcategory] = useState("");

  const showMoreItems = () => {
    setvisibleItems((prevItem) => prevItem + 6);
  };

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((response) => response.data.products)
      .then((data) => {
        // console.log(data);
        setAllProducts(data);
        setcartFilter(data);
        setLoader(true);
      })
      .catch((error) => {
        alert(error);
      });
  }, [loader]);

  return (
    <section>
      <div className="products">
        <div className="products__main-container">
          {!disableFilterOptions && (
            <FilterProduct
              cartCategory={cartCategory}
              setcartfilter={setcartFilter}
              setCartcategory={setCartcategory}
              allProducts={allProducts}
            />
          )}
          <div className="products__list">
            {loader ? (
              cartfilter.slice(0, visibleItems).map((prod, index) => {
                return (
                  <div className="products__list--cards" key={index}>
                    <div className="products__list--cards-content">
                      <div className="products__list--cards-image">
                        <img
                          src={`${
                            prod.images !== "null"
                              ? prod.thumbnail
                              : prod.images
                          }`}
                          alt="images"
                        />
                      </div>
                      <div className="products__list--cards-body">
                        <p className="products__list--cards-category">
                          {prod.category}
                        </p>
                        <h3 className="products__list--cards-title">
                          {prod.title}
                        </h3>
                        <div className="products__list--cards-text">
                          <h5 className="products__list--cards-text-price">
                            ${prod.price}
                          </h5>
                          <Rating stars={prod.rating} />
                        </div>

                        <div className="products__list--cards-cart-btn">
                          <Button
                            bgColor="#fe696a"
                            width="100%"
                            borderRadius="6px"
                            boxShadow="0"
                            padding="8px"
                            onClick={() => handleAddProduct(prod)}
                            fontSize="14px"
                            Color="white"
                          >
                            <FiShoppingCart className="cart" />
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <Spinner />
            )}
            {loader ? <MoreIems showMoreItems={showMoreItems} /> : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Shop;
