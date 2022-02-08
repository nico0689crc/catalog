import { useContext } from "react";
import { AppSettingsContext, BREAK_POINTS } from "../../contexts/AppSettings";
import {
  SidePanelContext,
  VIEWS as VIEWS_PANELS,
} from "../../contexts/SidePanels";
import { BiCustomize } from "react-icons/bi";
import { AuthContext } from "../../contexts/AuthContext";
import { ModalContext, VIEWS as VIEWS_MODALS } from "../../contexts/Modal";
import classNames from "classnames";
import Logo from "../../components/Logo/Logo";
import Button from "../../components/Button/Button";
import Links from "../../components/Links/Links";
import InputSearchHeader from "../../components/InputSearchHeader/InputSearchHeader";
import "./HeaderContainer.css";

export const POSITIONS = {
  ABSOLUTE: "absolute",
  FIXED: "fixed",
};

const HeaderContainer = () => {
  const {
    currentWidth,
    isMobileView,
    displayHeaderFixed,
    displaySearchInputMobile,
  } = useContext(AppSettingsContext);

  const { displaySidePanelHandler } = useContext(SidePanelContext);
  const { openModal } = useContext(ModalContext);

  const auth = useContext(AuthContext);

  const positionHeader = isMobileView
    ? POSITIONS.FIXED
    : displayHeaderFixed
    ? POSITIONS.FIXED
    : POSITIONS.ABSOLUTE;

  const classes = classNames(
    {
      border:
        currentWidth < BREAK_POINTS.tablet ||
        (positionHeader === POSITIONS.FIXED &&
          currentWidth >= BREAK_POINTS.tablet),
    },
    { "position-absolute": positionHeader === POSITIONS.ABSOLUTE },
    { "position-fixed": positionHeader === POSITIONS.FIXED }
  );

  const displaySearchInput =
    (positionHeader === POSITIONS.FIXED &&
      currentWidth >= BREAK_POINTS.mobile) ||
    (positionHeader === POSITIONS.FIXED &&
      currentWidth < BREAK_POINTS.mobile &&
      displaySearchInputMobile);

  const authOpenModalHandler = () => {
    openModal(VIEWS_MODALS.AUTH_LOGIN, null);
  };

  return (
    <>
      <header className={`main-header ${classes}`}>
        {!displaySearchInputMobile && (
          <div className="logo">
            <Logo />
          </div>
        )}

        {displaySearchInput && (
          <div className="search">
            <InputSearchHeader />
          </div>
        )}

        <nav className="navbar">
          <ul className="navbar__items">
            <li className="navbar__item">
              <Links to="/help" text="Questions" />
            </li>
            <li className="navbar__item">
              <Links to="/contact" text="Contact" />
            </li>
          </ul>
        </nav>
        <div className="user-actions">
          {!auth.isLoggedIn && (
            <Button
              onClick={authOpenModalHandler}
              shape="round"
              type="primary"
              htmlType="button"
              text="Join"
            />
          )}
        </div>
      </header>
      <div className={`filter-bar border ${classes}`}>
        <Button
          onClick={() => {
            displaySidePanelHandler(VIEWS_PANELS.CATEGORIES);
          }}
          shape="round"
          htmlType="button"
          text="Filter"
          icon={<BiCustomize />}
        />
      </div>
    </>
  );
};

export default HeaderContainer;
