import { useTranslation } from "react-i18next";
import Links from "../../components/Links/Links";
import "./MainMenuSidePannel.css";

const MainMenuSidePannel = () => {
  const { t } = useTranslation("header", { useSuspense: false });

  return (
    <nav className="main-menu-sidebar__container">
      <ul className="main-menu-sidebar__items">
        <li className="main-menu-sidebar__item">
          <Links to="/" text={t("text_navbar_home")} />
        </li>
        <li className="main-menu-sidebar__item">
          <Links to="/" text={t("text_navbar_question")} />
        </li>
        <li className="main-menu-sidebar__item">
          <Links to="/" text={t("text_navbar_contact")} />
        </li>
      </ul>
    </nav>
  );
};

export default MainMenuSidePannel;
