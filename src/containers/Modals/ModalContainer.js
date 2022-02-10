import { useContext } from "react";
import ProductDetails from "../../containers/Products/ProductDetails";
import { ModalContext, VIEWS } from "../../contexts/Modal";
import LoginContainer from "../Auth/Login/Login";
import RegisterContainer from "../Auth/Register/Register";
import ForgotPasswordContainer from "../Auth/ForgotPassword/ForgotPassword";
import ResetPasswordContainer from "../Auth/ResetPassword/ResetPassword";
import ActivationAccountContainer from "../Auth/ActivationAccount/ActivationAccount";
import Modal from "./Modal";

const ModalContainer = () => {
  const { state, closeModal } = useContext(ModalContext);

  return (
    <>
      {state.view ? (
        <Modal
          onClose={closeModal}
          open={state.isOpen}
          className={state.view.className}
        >
          {state.view.name === VIEWS.PRODUCT_DETAILS.name && (
            <ProductDetails product={state.data} />
          )}
          {state.view.name === VIEWS.AUTH_LOGIN.name && <LoginContainer />}
          {state.view.name === VIEWS.AUTH_REGISTER.name && (
            <RegisterContainer />
          )}
          {state.view.name === VIEWS.AUTH_FORGOT_PASSWORD.name && (
            <ForgotPasswordContainer />
          )}

          {state.view.name === VIEWS.AUTH_RESET_PASSWORD.name && (
            <ResetPasswordContainer />
          )}

          {state.view.name === VIEWS.AUTH_ACTIVATION_ACCOUNT.name && (
            <ActivationAccountContainer />
          )}
        </Modal>
      ) : null}
    </>
  );
};

export default ModalContainer;
