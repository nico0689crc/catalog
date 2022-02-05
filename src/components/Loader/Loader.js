import Loading from "react-loading-components";
import "./Loader.css";

const Loader = props => {
  return (
    <div className="loader-container">
      <Loading {...props} />
    </div>
  );
};

export default Loader;
