import { useState } from "react";
import "./ProductToCartButton.css";

const ProductToCartButton = () => {
  const [amountItems, setAmountItems] = useState(0);

  const decrementHandler = () => {
    setAmountItems(prev => (prev > 0 ? prev - 1 : 0));
  };
  const incrementHandler = () => {
    setAmountItems(prev => prev + 1);
  };

  return (
    <div className="product-item__add-to-cart-button">
      <div
        className={`add-to-cart-button__group ${
          amountItems > 0 ? "active" : ""
        }`}
      >
        {amountItems > 0 && (
          <button
            onClick={decrementHandler}
            className="add-to-cart-button__decrement"
          >
            -
          </button>
        )}
        {amountItems === 0 ? (
          <span
            onClick={incrementHandler}
            className="add-to-cart-button__label border-radius"
          >
            Agregar
          </span>
        ) : (
          <span className="add-to-cart-button__label">{amountItems}</span>
        )}

        <button
          onClick={incrementHandler}
          className="add-to-cart-button__increment"
        >
          +
        </button>
      </div>
    </div>
  );
};
export default ProductToCartButton;
