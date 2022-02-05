import { useCategoryQuery } from "../../hooks/queries/useCategoryQuery";
import { useSearchParams, Link } from "react-router-dom";
import IconTag from "../Icons/IconTag/IconTag";
import Loader from "../Loader/Loader";
import NotFound from "../NotFound/NotFound";
import Error from "../Error/Error";
import "./Categories.css";

const Categories = () => {
  const { data, error, isLoading } = useCategoryQuery();
  let searchParams = useSearchParams()[0];

  if (error) {
    return (
      <div className="categories-container">
        <Error message={error.message} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="categories-container">
        <Loader fill="#00a07f" width="100px" />
      </div>
    );
  }
  return (
    <div className="categories-container">
      {data?.length > 0 ? (
        <ul className="categories__items">
          {data.map((item, index) => (
            <li
              className={`categories__item ${
                searchParams.get("category") === item.attributes.slug
                  ? "active"
                  : ""
              }`}
              key={index}
            >
              <Link to={`?category=${item.attributes.slug}`}>
                <IconTag iconName={item.attributes.icon} />
                <span className="categories__label">
                  {item.attributes.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <NotFound />
      )}
    </div>
  );
};
export default Categories;
