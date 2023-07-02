import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { Button } from "../Styles/Button.style";
import { FiShoppingCart } from "react-icons/fi";
import Animate from "./Animate";

function ProductDetails({
  allProducts,
  handleAddProduct,
  handleIncrement,
  handleDecrement,
}) {
  const { id } = useParams();
  const matchedProducts = allProducts.find(
    (product) => product.id === Number(id)
  );
  console.log(matchedProducts);
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
          <h1 className="productdetails__card_title">
            {matchedProducts?.title}
          </h1>
          {/* <p className="productdetails__description">
              {matchedProducts?.description}
            </p> */}
          <Button
            hover="grey"
            padding="4px 10px"
            fontSize="16px"
            borderRadius="4px"
            marginRight="8px"
            onClick={() => handleIncrement(matchedProducts.id)}
          >
            +
          </Button>
          {/* <span>{matchedProducts?.quantity}</span> */}
          <Button
            hover="grey"
            padding="4px 10px"
            fontSize="16px"
            borderRadius="4px"
            onClick={() => handleDecrement(matchedProducts.id)}
          >
            -
          </Button>

          <Button
            bgColor="#fe696a"
            className="productdetails__card_btn"
            borderRadius="16px"
            boxShadow="10"
            padding="8px 10px"
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
