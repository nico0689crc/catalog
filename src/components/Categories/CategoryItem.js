import { useSearchParams, Link } from "react-router-dom";
import IconTag from "../Icons/IconTag/IconTag";
import "./CategoryItem.css";

const CategoryItem = ({
  item = null,
  toUrl = null,
  iconTagName = null,
  label = null,
}) => {
  const searchParams = useSearchParams()[0];
  const paramsQuery = {};

  if (item) {
    paramsQuery["category"] = item.attributes.slug;
  }

  if (searchParams.has("search")) {
    paramsQuery["search"] = searchParams.get("search");
  }

  const urlParamsQuery = new URLSearchParams(paramsQuery).toString();

  return (
    <li
      className={`categories__item ${
        !item || searchParams.get("category") === item.attributes.slug
          ? "active"
          : ""
      }`}
    >
      <Link to={toUrl ? `${toUrl}?${urlParamsQuery}` : `?${urlParamsQuery}`}>
        <IconTag iconName={iconTagName ? iconTagName : item.attributes.icon} />
        <span className="categories__label">
          {label ? label : item.attributes.name}
        </span>
      </Link>
    </li>
  );
};

export default CategoryItem;
