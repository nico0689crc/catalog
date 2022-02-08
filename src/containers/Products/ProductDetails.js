import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import { useProductQuery } from "../../hooks/queries/useProductQuery";
import ProductInfo from "./ProductInfo";
import "./ProductDetails.css";

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
