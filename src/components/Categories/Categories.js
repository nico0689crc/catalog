import { useCategoryQuery } from "../../hooks/queries/useCategoryQuery";
import { useSearchParams, Link } from "react-router-dom";
import CategoriesLoader from "../CategoriesLoader/CategoriesLoader";
import IconTag from "../Icons/IconTag/IconTag";
import "./Categories.css";
import { Code } from "react-content-loader";

const Categories = () => {
  const { data, error, isLoading } = useCategoryQuery();
  let searchParams = useSearchParams()[0];

  if (error) {
    return <h1>{error.message}</h1>;
  }

  if (isLoading) {
    return (
      <div className="categories-container">
        <CategoriesLoader />
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
        <div>Not found</div>
      )}
    </div>
  );
};
export default Categories;
