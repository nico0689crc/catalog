import noResultImage from "../../assets/images/no-result.svg";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found__container">
      <div className="not-found__image">
        <img alt="" src={noResultImage} />
      </div>
      <span className="not-found__message">Not data found</span>
    </div>
  );
};

export default NotFound;
