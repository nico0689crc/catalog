import { useContext, useEffect } from "react";
import { CartContext } from "../../../contexts/Cart/Cart";
import CartItemSidePanel from "../CartItemSidePanel/CartItemSidePanel";
import "./CartItemsSidePanel.css";

const CartItemsSidePanel = () => {
  const { items } = useContext(CartContext);
  useEffect(() => {
    document.querySelector("body").style.overflow = "hidden";

    return () => {
      document.querySelector("body").style.overflow = "auto";
    };
  }, []);

  return (
    <div className="cart-items-side-pannel__container">
      {items.map((item, index) => (
        <CartItemSidePanel item={item} key={index} />
      ))}
    </div>
  );
};

export default CartItemsSidePanel;
