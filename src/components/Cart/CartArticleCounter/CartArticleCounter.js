import { useContext } from "react";
import { BsCart4 } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { CartContext } from "../../../contexts/Cart/Cart";
import "./CartArticleCounter.css";

const CartArticleCounter = () => {
  const { totalItems } = useContext(CartContext);
  const { t } = useTranslation("cart", { useSuspense: false });

  return (
    <span className="cart-article-counter__container">
      <BsCart4 />{" "}
      {`${totalItems} ${
        totalItems > 1 ? t("text_articles") : t("text_article")
      }`}
    </span>
  );
};

export default CartArticleCounter;
