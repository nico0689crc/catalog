import { useContext } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../lib/routes";
import { AppSettingsContext } from "../../contexts/AppSettings";
import "./Logo.css";

const Logo = () => {
  const { logo } = useContext(AppSettingsContext);
  return (
    <Link className="logo__link" to={ROUTES.HOME}>
      <span className="logo__container">
        <img className="logo__img" src={logo.url} alt="Catolog"></img>
      </span>
    </Link>
  );
};

export default Logo;
