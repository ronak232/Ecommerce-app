import React, { useCallback, useEffect, useState } from "react";
import { Button } from "../Styles/Button.style";
import Spinner from "../ReuseComp/Loader/Loading";
import Rating from "../ReuseComp/Rating/Rating";
import { FiShoppingCart } from "react-icons/fi";
import FilterProduct from "./FilterProduct";
import { useNavigate } from "react-router-dom";

function Shop({
  handleAddProduct,
  disableFilterOptions,
  allProducts,
  cartFilter,
  setcartFilter,
  loading,
}) {
  const [paginatePages, setPaginatePages] = useState(0); //Current page

  const handlePageChange = (index) => {
    setPaginatePages(index);
  };

  // the useCallback hook to memoize the setcartFilter function. 
  // useCallback hook to memoize the function and only recreate it when its dependencies change
  // This helps to ensure that the function reference remains stable unless its dependencies change
  // memoizedSetcartFilter to the dependency array and using useCallback, you address the linting warning while ensuring that the function reference is stable.
  const memoizedSetcartFilter = useCallback(setcartFilter, [setcartFilter]);

  useEffect(() => {
    if (loading) {
      return;
    }
    setcartFilter(allProducts[paginatePages]);
    memoizedSetcartFilter(allProducts[paginatePages]);
  }, [loading, paginatePages, querySearch, allProducts, memoizedSetcartFilter]);

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
            {!loading ? (
              cartFilter
?.filter((product) =>
                  product?.title
                    ?.toLowerCase()
                    .includes((querySearch ?? "").toLowerCase())
                )
                ?.map((prod) => {
                  return (
                    <div className="products__list--cards" key={prod?.id}>
                      <div className="products__list--cards-content">
                        <div className="products__list--cards-image">
                          <img
                            onClick={() => detailNavigate(prod.id)}
                            src={`${
                              prod?.images !== "null" || undefined || ""
                              ? prod?.thumbnail
                              : prod?.images
                              }`}
                            alt="images"
                          />
                        </div>
                        <div className="products__list--cards-body">
                          <p className="products__list--cards-category">
                            {prod?.category}
                          </p>
                          <h3 className="products__list--cards-title">
                            {prod?.title}
                          </h3>
                          <div className="products__list--cards-text">
                            <h5 className="products__list--cards-text-price">
                              ${prod?.price}
                            </h5>
                            <Rating stars={prod?.rating} />
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
          </div>
        </div>
        {!loading && (
          <div className="page-btn">
            {allProducts.map((_, index) => {
              return (
                <button
                  className="page-btn__number"
                  key={index}
                  onClick={() => handlePageChange(index)}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default Shop;
