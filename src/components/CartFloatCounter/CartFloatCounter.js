import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { CartContext } from "../../contexts/Cart/Cart";
import { SidePanelContext, VIEWS } from "../../contexts/SidePanels";
import PriceFormater from "../PriceFormater/PriceFormater";
import { BsCart4 } from "react-icons/bs";

import "./CartFloatCounter.css";

const CartFloatCounter = () => {
  const { totalItems, totalPrice } = useContext(CartContext);
  const { displaySidePanelHandler } = useContext(SidePanelContext);
  const { t } = useTranslation("cart", { useSuspense: false });

  const openCartSidePanel = () => {
    displaySidePanelHandler(VIEWS.CART);
  };

  return (
    <div onClick={openCartSidePanel} className="cart-float-counter__container">
      <div className="cart-float-counter__info">
        <span className="cart-float-counter__counter">
          <BsCart4 />
          <span>{`${totalItems} ${
            totalItems > 1 ? t("text_articles") : t("text_article")
          }`}</span>
        </span>
      </div>
      <div className="cart-float-counter__info">
        <span className="cart-float-counter__totalPrice">
          {<PriceFormater price={totalPrice} />}
        </span>
      </div>
    </div>
  );
};

export default CartFloatCounter;
