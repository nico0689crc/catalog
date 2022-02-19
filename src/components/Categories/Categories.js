import { useCategoryQuery } from "../../hooks/queries/useCategoryQuery";
import Loader from "../Loader/Loader";
import NotFound from "../NotFound/NotFound";
import Error from "../Error/Error";
import CategoryItem from "./CategoryItem";
import "./Categories.css";

const Categories = () => {
  const { data, error, isLoading } = useCategoryQuery();

  for (let index = 0; index < array.length; index++) {
    const element = array[index];
  }

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
          <CategoryItem toUrl="/" iconTagName="Face" label="Todos" />
          {data.map((item, index) => (
            <CategoryItem item={item} key={index} />
          ))}
        </ul>
      ) : (
        <NotFound />
      )}
    </div>
  );
};
export default Categories;
