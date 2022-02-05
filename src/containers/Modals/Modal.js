import { useRef, useEffect } from "react";
import Portal from "@reach/portal";
import { AnimatePresence, motion } from "framer-motion";
import { fadeInOutModal } from "../../lib/motion/fadeInOutModal";
import { fadeInOut } from "../../lib/motion/fadeInOut";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";
import { BiX } from "react-icons/bi";
import "./Modal.css";

const Modal = ({ onClose, open = false, children }) => {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      if (open) {
        disableBodyScroll(ref.current);
      } else {
        enableBodyScroll(ref.current);
      }
    }
    return () => {
      clearAllBodyScrollLocks();
    };
  }, [open]);

  return (
    <Portal>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={ref}
            key="modal"
            initial="from"
            animate="to"
            exit="from"
            variants={fadeInOutModal()}
            className="modal__wrapper"
          >
            <div className="modal__inner">
              <motion.div
                initial="from"
                animate="to"
                exit="from"
                variants={fadeInOut(0)}
                onClick={onClose}
                className="modal__backdrop"
              ></motion.div>
              <div className="modal__container">
                <div className="modal__header">
                  <button
                    className="modal__close-modal-button"
                    onClick={onClose}
                    type="button"
                  >
                    <BiX />
                  </button>
                </div>
                <div className="modal__content">{children}</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
};

export default Modal;
