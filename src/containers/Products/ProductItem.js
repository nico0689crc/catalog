import ProductToCartButton from "./ProductToCartButton";
import PriceFormater from "../../components/PriceFormater/PriceFormater";
import { useContext, useMemo } from "react";
import { ModalContext, VIEWS } from "../../contexts/Modal";
import "./ProductItem.css";

const ProductItem = ({ product }) => {
  const { sale_price, price, quantity } = product.attributes;
  const { openModal } = useContext(ModalContext);

  const openModalHandler = product => {
    openModal(VIEWS.PRODUCT_DETAILS, product);
  };

  const discount = useMemo(() => {
    const hasDiscount = sale_price && sale_price < price;

    return hasDiscount
      ? `${Math.round(((price - sale_price) / price) * 100)} %`
      : null;
  }, [sale_price, price]);

  return (
    <article className="product-list__item">
      {discount && <span className="product-item__discount">{discount}</span>}

      <div
        onClick={openModalHandler.bind(this, product)}
        className="product-item__image"
      >
        <img src={product.attributes.images[0].thumbnail.url}></img>
      </div>
      <header
        onClick={openModalHandler.bind(this, product)}
        className="product-item__info"
      >
        <div className="product-item__prices">
          {sale_price ? (
            <>
              <span className="product-item__price">
                <PriceFormater price={sale_price} />
              </span>

              <span className="product-item__price-deleted">
                <PriceFormater price={price} />
              </span>
            </>
          ) : (
            <span className="product-item__price">
              <PriceFormater price={price} />
            </span>
          )}
        </div>
        <h3 className="product-item__name">{product.attributes.name}</h3>
      </header>
      <div className="product-item__add-to-cart-button"></div>
      {quantity > 0 && <ProductToCartButton product={product} />}
    </article>
  );
};

export default ProductItem;
