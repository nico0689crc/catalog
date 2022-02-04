import { useSearchParams } from "react-router-dom";
import { Fragment } from "react";
import { useProductsQuery } from "../../hooks/queries/useProductsQuery";
import Button from "../Button/Button";
import "./ProductList.css";
import ProductToCartButton from "./ProductToCartButton";

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
    isError,
    data,
    error,
    getNextPageParam,
  } = useProductsQuery(params);

  const loadMoreHandler = () => {
    fetchNextPage();
  };

  return (
    <div className="product-list__container">
      <div className="product-list__items">
        {data?.pages?.map((products, index) => (
          <Fragment key={index}>
            {products?.data?.map((product, index) => (
              <article key={index} className="product-list__item">
                <div className="product-item__image">
                  <img src={product.attributes.images[0].thumbnail.url}></img>
                </div>
                <header className="product-item__info">
                  <div className="product-item__prices">
                    <span className="product-item__price">
                      {product.attributes.price}
                    </span>
                    {product.attributes.sale_price && (
                      <span className="product-item__sale-price">
                        {product.attributes.sale_price}
                      </span>
                    )}
                  </div>
                  <h3 className="product-item__name">
                    {product.attributes.name}
                  </h3>
                  <ProductToCartButton />
                </header>
              </article>
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
    </div>
  );
};

export default ProductList;
