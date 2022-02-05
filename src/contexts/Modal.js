import { createContext, useReducer } from "react";

const intialStateContext = {
  state: { isOpen: false, data: null, view: "" },
  openModal: () => {},
  closeModal: () => {},
};

const initialStateReducer = {
  isOpen: false,
  data: null,
  view: "",
};

export const VIEWS = {
  PRODUCT_DETAILS: "PRODUCT_DETAILS",
};

export const MODAL_STATUS = {
  OPEN: "OPEN",
  CLOSE: "CLOSE",
};

const reducer = (state, action) => {
  switch (action.type) {
    case MODAL_STATUS.OPEN:
      return {
        ...state,
        view: action.view,
        data: action.payload,
        isOpen: true,
      };
    case MODAL_STATUS.CLOSE:
      return {
        ...state,
        view: action.view,
        data: action.payload,
        isOpen: false,
      };
    default:
      throw new Error("Unknown Modal Action!");
  }
};

export const ModalContext = createContext(intialStateContext);

export const ModalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialStateReducer);

  const openModal = (view, payload) => {
    dispatch({ type: MODAL_STATUS.OPEN, view, payload });
  };
  const closeModal = () => {
    dispatch({ type: MODAL_STATUS.CLOSE });
  };

  return (
    <ModalContext.Provider
      value={{
        state,
        openModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
