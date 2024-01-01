import React from "react";
import { Link } from "react-router-dom";

function OffersBanner() {
  return (
    <div className="product__offer-banner">
      <div className="product__offer-banner-first">
        <button className="btn-sale"><Link to="/shop">Sale On</Link></button>
      </div>
      <div className="product__offer-banner-second">
        <button className="btn-shop">
          <Link to="/shop">Shop Now</Link>
        </button>
      </div>
    </div>
  );
}

export default OffersBanner;
