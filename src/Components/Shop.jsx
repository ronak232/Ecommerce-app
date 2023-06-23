import React, { useState } from "react";
import { Button } from "../Styles/Button.style";
import Spinner from "../ReuseComp/Loader/Loading";
import Rating from "../ReuseComp/Rating/Rating";
import { FiShoppingCart } from "react-icons/fi";
import FilterProduct from "./FilterProduct";
import MoreIems from "../ReuseComp/CartComponents/MoreIems";
import { useNavigate } from "react-router-dom";

function Shop({
  handleAddProduct,
  disableFilterOptions,
  allProducts,
  cartFilter,
  setcartFilter,
}) {
  // Loading State
  // const [loader, setLoader] = useState(true);
  // Loading More Items State
  // console.log(allProducts);
  const [visibleItems, setvisibleItems] = useState(8);
  // console.log(visibleItems);

  // const [cartFilter, setcartFilter] = useState([]);

  const showMoreItems = () => {
    setTimeout(() => {
      setvisibleItems((prevItem) => prevItem + 6);
    }, 1000);
  };

  const Navigate = useNavigate();
  const detailNavigate = (id) => {
    Navigate(`/details/${id}`);
  };

  return (
    <section>
      <div className="products">
        <div className="products__main-container">
          {!disableFilterOptions && (
            <FilterProduct
              setcartFilter={setcartFilter}
              allProducts={allProducts}
              cartFilter={cartFilter}
            />
          )}

          <div className="products__list">
            {cartFilter.slice(0, visibleItems).map((prod, index) => {
              return (
                <div className="products__list--cards" key={index}>
                  <div className="products__list--cards-content">
                    <div className="products__list--cards-image">
                      <img
                        onClick={() => detailNavigate(prod.id)}
                        src={`${
                          prod.images !== "null" ? prod.thumbnail : prod.images
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
            })}

            {visibleItems < cartFilter.length ? (
              <MoreIems showMoreItems={showMoreItems} cartFilter={cartFilter} disableButton={true} />
            ) : (
              <MoreIems
                showMoreItems={showMoreItems}
                cartFilter={cartFilter}
                disableButton={false}
              />
            )}

            {/* {loader ? <MoreIems showMoreItems={showMoreItems} /> : <Spinner />} */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Shop;
