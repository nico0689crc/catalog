import { useContext } from "react";
import {
  CgMenuLeft,
  CgSearch,
  CgHome,
  CgUser,
  CgShoppingBag,
} from "react-icons/cg";
import { AuthContext } from "../../contexts/AuthContext";
import { ModalContext, VIEWS as VIEWS_MODALS } from "../../contexts/Modal";
import { AppSettingsContext } from "../../contexts/AppSettings";
import {
  SidePanelContext,
  VIEWS as VIEWS_PANELS,
} from "../../contexts/SidePanels";
import "./NavActionsMobileContainer.css";
import { CartContext } from "../../contexts/Cart/Cart";

const NavActionsMobileContainer = () => {
  const { setDisplaySearchInputMobile } = useContext(AppSettingsContext);
  const { displaySidePanelHandler } = useContext(SidePanelContext);
  const { openModal } = useContext(ModalContext);
  const { totalItems } = useContext(CartContext);
  const { token } = useContext(AuthContext);

  const displaySearchInputMobile = () => {
    setDisplaySearchInputMobile(prev => !prev);
  };

  const openUserAuthHandler = () => {
    token
      ? displaySidePanelHandler(VIEWS_PANELS.USER_PROFILE)
      : openModal(VIEWS_MODALS.AUTH_LOGIN, null);
  };

  return (
    <nav className="nav-actions-mobile">
      <ul className="nav-actions-mobile__items">
        <li className="nav-actions-mobile__item">
          <button
            onClick={() => {
              displaySidePanelHandler(VIEWS_PANELS.MAIN_MENU);
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
          <span className="cart_items_counter">{totalItems}</span>
          <button
            onClick={() => {
              displaySidePanelHandler(VIEWS_PANELS.CART);
            }}
            className="nav-actions-mobile__button"
          >
            <CgShoppingBag />
          </button>
        </li>
        <li className="nav-actions-mobile__item">
          <button
            onClick={openUserAuthHandler}
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
