import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../contexts/Cart/Cart";
import "./ProductToCartButton.css";

const ProductToCartButton = ({ product }) => {
  const [amountItems, setAmountItems] = useState(0);
  const { increaseItemQuantity, decreaseItemQuantity, items } =
    useContext(CartContext);

  const decrementHandler = () => {
    decreaseItemQuantity({ id: product.id, ...product.attributes });
  };

  const incrementHandler = () => {
    increaseItemQuantity({ id: product.id, ...product.attributes });
  };

  useEffect(() => {
    const itemCartIndex = items.findIndex(item => product.id === item.id);

    if (itemCartIndex > -1) {
      const amount = items[itemCartIndex].quantity;
      setAmountItems(amount);
    } else {
      setAmountItems(0);
    }
  }, [items]);

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
