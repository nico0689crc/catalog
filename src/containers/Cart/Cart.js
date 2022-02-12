import { useEffect } from "react";
import CartArticleCounter from "../../components/Cart/CartArticleCounter/CartArticleCounter";
import CartItemsSidePanel from "../../components/Cart/CartItemsSidePanel/CartItemsSidePanel";
import CartTotalPrice from "../../components/Cart/CartTotalPrice/CartTotalPrice";
import "./Cart.css";

const CartContainer = () => {
  return (
    <div className="side-panel-cart__container">
      <div className="side-panel-cart__header">
        <CartArticleCounter />
      </div>
      <div className="side-panel-cart__body">
        <CartItemsSidePanel />
      </div>
      <div className="side-panel-cart__footer">
        <CartTotalPrice />
      </div>
    </div>
  );
};

export default CartContainer;
