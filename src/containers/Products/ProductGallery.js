import { useRef, useState } from "react";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import {
  Swiper,
  SwiperSlide,
  Navigation,
  Thumbs,
} from "../../components/UI/Slider/Slider";

import "./ProductGallery.css";

const galleryCarouselBreakpoints = {
  320: {
    slidesPerView: 2,
  },
  480: {
    slidesPerView: 3,
  },
  640: {
    slidesPerView: 3,
  },
  800: {
    slidesPerView: 4,
  },
};
const swiperParams = {
  slidesPerView: 1,
  spaceBetween: 0,
};

const ProductGallery = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="product-gallery__containers">
      <Swiper
        id="productGallery"
        modules={[Navigation, Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
        navigation={{
          prevEl: prevRef.current, // Assert non-null
          nextEl: nextRef.current, // Assert non-null
        }}
        {...swiperParams}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="product-gallery__slide">
            <img
              src={image?.original.url}
              alt={`Product gallery ${image.id}`}
              width={450}
              height={450}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="product-gallery__previous-button">
        <button ref={prevRef} type="button">
          <GrLinkPrevious />
        </button>
      </div>
      <div className="product-gallery__next-button">
        <button ref={nextRef} type="button">
          <GrLinkNext />
        </button>
      </div>
      <div className="product-gallery__thumbs">
        <Swiper
          id="productGalleryThumbs"
          onSwiper={setThumbsSwiper}
          spaceBetween={20}
          watchSlidesProgress={true}
          freeMode={true}
          observer={true}
          observeParents={true}
          breakpoints={galleryCarouselBreakpoints}
        >
          {images?.map((images, index) => (
            <SwiperSlide key={index} className="product-gallery__thumb">
              <img
                src={images?.thumbnail.url}
                alt={`Product thumb gallery ${images.id}`}
                width={80}
                height={80}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductGallery;
