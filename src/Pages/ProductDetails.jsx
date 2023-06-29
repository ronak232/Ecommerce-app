import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { Button } from "../Styles/Button.style";
import { FiShoppingCart } from "react-icons/fi";

function ProductDetails({ allProducts, handleAddProduct }) {
  const { id } = useParams();
  // const { title, images } = id;
  // const [matchedProduct, setmatchedProduct] = useState(
  //   localStorage.getItem("productDetails")
  // );
  const matchedProducts = allProducts.find(
    (product) => product.id === Number(id)
  );

  // useEffect(() => {
  //   setmatchedProduct(localStorage.setItem("productDetails", matchedProducts));
  // }, [matchedProducts]);
  return (
    <div className="productdetails__container">
      <div className="productdetails__card">
        <div className="productdetails__card_img">
          <div className="img">
            {matchedProducts?.images.map((img) => {
              return <img src={img} alt="" />;
            })}
          </div>
        </div>

        <div className="productdetails__card_body">
          <h1 className="productdetails__title">{matchedProducts?.title}</h1>
          <p className="productdetails__description">
            {matchedProducts?.description}
          </p>

          <Button
            bgColor="#fe696a"
            width="100%"
            borderRadius="16px"
            boxShadow="10"
            padding="8px"
            onClick={() => handleAddProduct(matchedProducts)}
            fontSize="14px"
            Color="white"
          >
            <FiShoppingCart className="cart" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
