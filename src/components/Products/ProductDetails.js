import Loader from "../Loader/Loader";
import "./ProductDetails.css";

const ProductDetails = ({ product }) => {
  return (
    <div className="product-details">
      <Loader fill="#00a07f" width="100px" />
    </div>
  );
};

export default ProductDetails;
