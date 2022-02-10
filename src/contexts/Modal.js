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
  PRODUCT_DETAILS: {
    name: "PRODUCT_DETAILS",
    className: "product-details-modal",
  },

  AUTH_LOGIN: {
    name: "AUTH_LOGIN",
    className: "login-form-modal",
  },

  AUTH_REGISTER: {
    name: "AUTH_REGISTER",
    className: "register-form-modal",
  },

  AUTH_FORGOT_PASSWORD: {
    name: "AUTH_FORGOT_PASSWORD",
    className: "forgot-password-form-modal",
  },

  AUTH_RESET_PASSWORD: {
    name: "AUTH_RESET_PASSWORD",
    className: "reset-password-form-modal",
  },

  AUTH_ACTIVATION_ACCOUNT: {
    name: "AUTH_ACTIVATION_ACCOUNT",
    className: "activation-account-form-modal",
  },
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
