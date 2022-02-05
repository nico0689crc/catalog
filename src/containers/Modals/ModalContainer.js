import { useContext } from "react";
import ProductDetails from "../../components/Products/ProductDetails";
import { ModalContext, VIEWS } from "../../contexts/Modal";
import Modal from "./Modal";

const ModalContainer = () => {
  const { state, closeModal } = useContext(ModalContext);

  return (
    <Modal onClose={closeModal} open={state.isOpen}>
      {state.view === VIEWS.PRODUCT_DETAILS && (
        <ProductDetails product={state.data} />
      )}
    </Modal>
  );
};

export default ModalContainer;
