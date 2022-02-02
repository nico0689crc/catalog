import { createContext, useReducer } from "react";

const intialStateContext = {
  state: { isOpen: false, view: "", variant: "" },
  displaySidePanelHandler: () => {},
};

const initialStateReducer = {
  isOpen: false,
  view: "",
  variant: "",
};

export const VIEWS = {
  MAIN_MENU: "MAIN_MENU",
  CART: "CART",
  CATEGORIES: "CATEGORIES",
  USER_PROFILE: "USER_PROFILE",
  NONE: "",
};

export const PANEL_STATUS = {
  OPEN: "OPEN",
  CLOSE: "CLOSE",
};

const reducer = (state, action) => {
  switch (action.type) {
    case PANEL_STATUS.OPEN:
      return {
        view: action.view,
        isOpen: true,
        variant: action.variant,
      };
    case PANEL_STATUS.CLOSE:
      return {
        view: VIEWS.NONE,
        isOpen: false,
        variant: state.variant,
      };
    default:
      throw new Error();
  }
};

export const SidePanelContext = createContext(intialStateContext);

export const SidePanelProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialStateReducer);

  const displaySidePanelHandler = view => {
    const typeDispatch =
      view !== VIEWS.NONE ? PANEL_STATUS.OPEN : PANEL_STATUS.CLOSE;

    const variant =
      view === VIEWS.CATEGORIES || view === VIEWS.MAIN_MENU ? "left" : "right";

    dispatch({ type: typeDispatch, view, variant });
  };

  return (
    <SidePanelContext.Provider
      value={{
        state,
        displaySidePanelHandler,
      }}
    >
      {children}
    </SidePanelContext.Provider>
  );
};
