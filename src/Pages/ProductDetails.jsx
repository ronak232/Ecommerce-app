import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { Button } from "../Styles/Button.style";
import { FiShoppingCart } from "react-icons/fi";

function ProductDetails({ allProducts, handleAddProduct }) {
  const { id } = useParams();
  // console.log(typeof id)
  // console.log(allProducts)
  // const { title, images } = id;
  const matchedProduct = allProducts.find(
    (product) => product.id === Number(id)
  );

  return (
    <div>
      <div>
        <img src={matchedProduct.images[0]} alt="" />
      </div>
      <h1>{matchedProduct.title}</h1>
      <p>{matchedProduct.description}</p>

      <Button
        bgColor="#fe696a"
        width="100%"
        borderRadius="6px"
        boxShadow="0"
        padding="8px"
        onClick={() => handleAddProduct(matchedProduct)}
        fontSize="14px"
        Color="white"
      >
        <FiShoppingCart className="cart" />
        Add to Cart
      </Button>
    </div>
  );
}

export default ProductDetails;
