import { useContext } from "react";
import {
  CgMenuLeft,
  CgSearch,
  CgHome,
  CgUser,
  CgShoppingBag,
} from "react-icons/cg";
import { AppSettingsContext } from "../../contexts/AppSettings";
import { SidePanelContext, VIEWS } from "../../contexts/SidePanels";
import "./NavActionsMobileContainer.css";

const NavActionsMobileContainer = () => {
  const { setDisplaySearchInputMobile } = useContext(AppSettingsContext);
  const { displaySidePanelHandler } = useContext(SidePanelContext);

  const displaySearchInputMobile = () => {
    setDisplaySearchInputMobile(prev => !prev);
  };

  return (
    <nav className="nav-actions-mobile">
      <ul className="nav-actions-mobile__items">
        <li className="nav-actions-mobile__item">
          <button
            onClick={() => {
              displaySidePanelHandler(VIEWS.MAIN_MENU);
            }}
            className="nav-actions-mobile__button"
          >
            <CgMenuLeft />
          </button>
        </li>
        <li className="nav-actions-mobile__item">
          <button
            onClick={displaySearchInputMobile}
            className="nav-actions-mobile__button"
          >
            <CgSearch />
          </button>
        </li>
        <li className="nav-actions-mobile__item">
          <button className="nav-actions-mobile__button">
            <CgHome />
          </button>
        </li>
        <li className="nav-actions-mobile__item">
          <button
            onClick={() => {
              displaySidePanelHandler(VIEWS.CART);
            }}
            className="nav-actions-mobile__button"
          >
            <CgShoppingBag />
          </button>
        </li>
        <li className="nav-actions-mobile__item">
          <button
            onClick={() => {
              displaySidePanelHandler(VIEWS.USER_PROFILE);
            }}
            className="nav-actions-mobile__button"
          >
            <CgUser />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavActionsMobileContainer;
