import { useContext } from "react";
import { SidePanelContext, VIEWS } from "../../contexts/SidePanels";
import Categories from "../../components/Categories/Categories";
import MainMenuSidePannel from "../MainMenu/MainMenuSidePannel";
import UserMenuSidePannel from "../UserMenu/UserMenuSidePannel";
import CartContainer from "../Cart/Cart";
import Panel from "./Panel";

const SidePanelsContainer = () => {
  const { state, displaySidePanelHandler } = useContext(SidePanelContext);
  return (
    <Panel
      open={state.isOpen}
      variant={state.variant}
      onClose={() => {
        displaySidePanelHandler(VIEWS.NONE);
      }}
    >
      {state.view === VIEWS.CART && <CartContainer />}
      {state.view === VIEWS.USER_PROFILE && <UserMenuSidePannel />}
      {state.view === VIEWS.MAIN_MENU && <MainMenuSidePannel />}
      {state.view === VIEWS.CATEGORIES && <Categories />}
    </Panel>
  );
};

export default SidePanelsContainer;
