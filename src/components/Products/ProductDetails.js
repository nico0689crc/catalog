import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import { useProductQuery } from "../../hooks/queries/useProductQuery";
import "./ProductDetails.css";
import ProductInfo from "./ProductInfo";

const ProductDetails = ({ product }) => {
  const { data, error, isLoading, isFetched } = useProductQuery({
    id: product.id,
    include: ["categories", "tags"],
  });

  return (
    <div className="product-details">
      {isLoading && (
        <div className="product-details__loader">
          <Loader fill="#00a07f" width="100px" />
        </div>
      )}

      {isFetched && error && (
        <div className="product-details__error">
          <Error message={error.message} />
        </div>
      )}
      {isFetched && !error && data && <ProductInfo product={data} />}
    </div>
  );
};

export default ProductDetails;
