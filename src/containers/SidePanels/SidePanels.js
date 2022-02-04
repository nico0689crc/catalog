import { useContext } from "react";
import Categories from "../../components/Categories/Categories";
import { SidePanelContext, VIEWS } from "../../contexts/SidePanels";
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
      {state.view === VIEWS.CART && <h1>Cart</h1>}
      {state.view === VIEWS.USER_PROFILE && <h1>User Profile</h1>}
      {state.view === VIEWS.MAIN_MENU && <h1>Main Menu</h1>}
      {state.view === VIEWS.CATEGORIES && <Categories />}
    </Panel>
  );
};

export default SidePanelsContainer;
