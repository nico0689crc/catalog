import { useSearchParams } from "react-router-dom";
import { Fragment } from "react";
import { useProductsQuery } from "../../hooks/queries/useProductsQuery";
import Button from "../../components/Button/Button";
import ProductItem from "./ProductItem";
import Error from "../../components/Error/Error";
import Loader from "../../components/Loader/Loader";
import NotFound from "../../components/NotFound/NotFound";
import "./ProductList.css";

const ProductList = () => {
  let searchParams = useSearchParams()[0];

  const params = {
    size: "10",
    page: "1",
    include: ["categories", "tags"],
  };

  if (searchParams.get("category")) {
    params["filter"] = [
      {
        field: "categories.slug",
        criteria: `contain(${searchParams.get("category")})`,
      },
    ];
  }

  const {
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    data,
    error,
  } = useProductsQuery(params);

  const loadMoreHandler = () => {
    fetchNextPage();
  };

  if (error) {
    return (
      <div className="categories-container">
        <Error message={error.message} />
      </div>
    );
  }

  if (isFetching && !data?.pages?.length) {
    return (
      <div className="categories-container">
        <Loader fill="#00a07f" width="100px" />
      </div>
    );
  }

  return (
    <div className="product-list__container">
      {data?.pages[0]?.data.length > 0 ? (
        <>
          <div className="product-list__items">
            {data?.pages?.map((products, index) => (
              <Fragment key={index}>
                {products?.data?.map((product, index) => (
                  <ProductItem key={index} product={product} />
                ))}
              </Fragment>
            ))}
          </div>

          {hasNextPage && (
            <div className="product-list__load-more">
              <Button
                onClick={loadMoreHandler}
                type="primary"
                text="Cargar mas"
                shape="round"
                loadingText="Cargando mas"
                loading={isFetchingNextPage}
              />
            </div>
          )}
        </>
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default ProductList;
