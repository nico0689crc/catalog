import { useContext } from "react";
import ProductDetails from "../../containers/Products/ProductDetails";
import { ModalContext, VIEWS } from "../../contexts/Modal";
import Login from "../Auth/Login/Login";
import Register from "../Auth/Register/Register";
import ResetPassword from "../Auth/ResetPassword/ResetPassword";

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
          {state.view.name === VIEWS.AUTH_LOGIN.name && <Login />}
          {state.view.name === VIEWS.AUTH_REGISTER.name && <Register />}
          {state.view.name === VIEWS.AUTH_RESET_PASSWORD.name && (
            <ResetPassword />
          )}
        </Modal>
      ) : null}
    </>
  );
};

export default ModalContainer;
