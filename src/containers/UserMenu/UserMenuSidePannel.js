import { useContext } from "react";
import { useTranslation } from "react-i18next";
import Links from "../../components/Links/Links";
import { AuthContext } from "../../contexts/AuthContext";
import { SidePanelContext, VIEWS } from "../../contexts/SidePanels";
import "./UserMenuSidePannel.css";

const UserMenuSidePannel = () => {
  const { t } = useTranslation("header", { useSuspense: false });
  const { logout } = useContext(AuthContext);
  const { displaySidePanelHandler } = useContext(SidePanelContext);

  const logOutHandler = () => {
    logout();
    displaySidePanelHandler(VIEWS.NONE);
  };

  return (
    <nav className="user-menu-sidebar__container">
      <ul className="user-menu-sidebar__items">
        <li className="user-menu-sidebar__item">
          <Links to="/profile" text={t("dropdown_item_profile")} />
        </li>
        <li onClick={logOutHandler} className="user-menu-sidebar__item">
          <span className="">{t("dropdown_item_logout")}</span>
        </li>
      </ul>
    </nav>
  );
};

export default UserMenuSidePannel;
