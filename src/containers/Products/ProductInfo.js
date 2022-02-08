import { useMemo } from "react";
import { Link } from "react-router-dom";
import { parseIncludedData } from "../../lib/parseIncludedData";
import PriceFormater from "../../components/PriceFormater/PriceFormater";
import ProductToCartButton from "./ProductToCartButton";
import Divider from "../../components/UI/Divider/Divider";
import ProductGallery from "./ProductGallery";
import "./ProductInfo.css";

const ProductInfo = ({ product }) => {
  const productParsed = parseIncludedData(product);
  const {
    sale_price,
    price,
    quantity,
    name,
    description,
    categories,
    tags,
    images,
  } = productParsed;

  const discount = useMemo(() => {
    const hasDiscount = sale_price && sale_price < price;

    return hasDiscount
      ? `${Math.round(((price - sale_price) / price) * 100)} %`
      : null;
  }, [sale_price, price]);

  return (
    <div className="product-details__content">
      <div className="product-details__info">
        <div className="product-details__left-side">
          <ProductGallery images={images} />
        </div>
        <div className="product-details__rigth-side">
          <h2 className="product__name">{name}</h2>
          <p className="product__description">{description}</p>
          <div className="product__prices">
            <span className="product__price">
              <PriceFormater price={sale_price ? sale_price : price} />
            </span>

            {sale_price && (
              <span className="product__price-deleted">
                <PriceFormater price={price} />
              </span>
            )}
          </div>
          <div className="product__group-items">
            {quantity > 0 && <ProductToCartButton />}
            <p className="product__quantity">
              {quantity} unidades disponibles.
            </p>
          </div>

          <Divider />
          <div className="product__categories-container">
            <div className="product__categories-label">
              <span>Categorias</span>
            </div>
            <div className="product__categories">
              <Link to={`?category=${categories.attributes.slug}`}>
                {categories.attributes.name}
              </Link>
            </div>
          </div>

          <div className="product__tags-container">
            <div className="product__tags-label">
              <span>Etiquetas</span>
            </div>
            <div className="product__tags">
              {tags.map((tag, index) => (
                <span key={index}>{tag.attributes.name}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="product-details__related"></div>
    </div>
  );
};

export default ProductInfo;
