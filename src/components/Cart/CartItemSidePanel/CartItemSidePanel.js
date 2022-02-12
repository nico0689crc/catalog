import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { BiX } from "react-icons/bi";
import { CartContext } from "../../../contexts/Cart/Cart";
import PriceFormater from "../../PriceFormater/PriceFormater";
import "./CartItemSidePanel.css";

const CartItemSidePanel = ({ item }) => {
  const { t } = useTranslation("cart", { useSuspense: false });
  const { decreaseItemQuantity, increaseItemQuantity, removeItemFromCart } =
    useContext(CartContext);

  const decreaseItemQuantityHandler = () => {
    decreaseItemQuantity(item);
  };
  const increaseItemQuantityHandler = () => {
    increaseItemQuantity(item);
  };

  const removeItemFromCartHandler = () => {
    removeItemFromCart(item);
  };

  return (
    <div className="cart-item-side-panel__container">
      <div className="cart-item-side-panel__add-cart-button">
        <button onClick={increaseItemQuantityHandler}>+</button>
        <button>{item.quantity}</button>
        <button onClick={decreaseItemQuantityHandler}>-</button>
      </div>
      <div className="cart-item-side-panel__thumb">
        <img src={item.images[0].thumbnail.url} />
      </div>
      <div className="cart-item-side-panel__info">
        <span className="cart-item-side-panel__product-name">{item.name}</span>
        <span className="cart-item-side-panel__unit-price">
          <PriceFormater
            price={item.sale_price ? item.sale_price : item.price}
          />
        </span>
        <span className="cart-item-side-panel__quantity">{`${item.quantity} x ${
          item.quantity > 1 ? t("text_units") : t("text_unit")
        }`}</span>
      </div>
      <div className="cart-item-side-panel__item-total-price">
        <span>
          <PriceFormater price={item.totalPrice} />
        </span>
      </div>
      <div className="cart-item-side-panel__remove-button">
        <button onClick={removeItemFromCartHandler}>
          <BiX />
        </button>
      </div>
    </div>
  );
};
export default CartItemSidePanel;
