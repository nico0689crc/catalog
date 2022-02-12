import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { CartContext } from "../../../contexts/Cart/Cart";

import PriceFormater from "../../PriceFormater/PriceFormater";
import "./CartTotalPrice.css";

const CartTotalPrice = () => {
  const { t } = useTranslation("cart", { useSuspense: false });
  const { totalPrice } = useContext(CartContext);

  const payButtonHandler = () => {};

  return (
    <div className="cart-total-price__container">
      <button onClick={payButtonHandler} className="cart-total-price__button">
        <span className="cart-total-price__label">{t("text_pay")}</span>
        <span className="cart-total-price__total-price">
          <PriceFormater price={totalPrice} />
        </span>
      </button>
    </div>
  );
};

export default CartTotalPrice;
