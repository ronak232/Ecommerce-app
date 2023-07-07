import React, { useState } from "react";
// import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useParams } from "react-router-dom";
import { Button } from "../Styles/Button.style";
import { FiShoppingCart } from "react-icons/fi";

function ProductDetails({ allProducts, handleAddProduct }) {
  const [thumbNailImg, setThumbNailImg] = useState(null);
  const { id } = useParams();
  const matchedProducts = allProducts.find(
    (product) => product.id === Number(id)
  );

  return (
    <div className="productdetails__container">
      <div className="productdetails__card">
        <Swiper
          style={{
            "--swiper-navigation-color": "#000",
            "--swiper-pagination-color": "#000",
          }}
          loop={true}
          spaceBetween={10}
          navigation={true}
          thumbs={{
            swiper:
              thumbNailImg && !thumbNailImg.destroyed ? thumbNailImg : null,
          }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="productimages__slider_thumbs"
        >
          {matchedProducts?.images.map((img) => {
            return (
              <SwiperSlide className="productdetails__card_img">
                <img src={img} alt="" />
              </SwiperSlide>
            );
          })}
        </Swiper>

        <Swiper
          onSwiper={setThumbNailImg}
          loop={true}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="productdetails__thumb_gallery"
        >
          {matchedProducts?.images.map((img) => {
            return (
              <SwiperSlide className="productdetails__thumb-slide">
                <img src={img} alt="" />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className="productdetails__card_body">
        <h1 className="productdetails__title">{matchedProducts?.title}</h1>
        <p className="productdetails__description">
          {matchedProducts?.description}
        </p>

        <Button
          bgColor="#fe696a"
          width="30%"
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
  );
}

export default ProductDetails;
