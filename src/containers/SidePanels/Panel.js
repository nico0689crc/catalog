import { BiX } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInLeft } from "../../lib/motion/fadeInLeft";
import { fadeInRight } from "../../lib/motion/fadeInRight";
import { fadeInOut } from "../../lib/motion/fadeInOut";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import Portal from "@reach/portal";

import "overlayscrollbars/css/OverlayScrollbars.css";
import "./Panel.css";
import Logo from "../../components/Logo/Logo";

const Panel = ({ children, open = false, variant = "right", onClose }) => {
  return (
    <Portal>
      <AnimatePresence>
        {open && (
          <motion.aside
            key="drawer"
            initial="from"
            animate="to"
            exit="from"
            variants={variant === "right" ? fadeInRight() : fadeInLeft()}
            className="panel__aside"
          >
            <div className="panel_inner">
              <motion.div
                initial="from"
                animate="to"
                exit="from"
                variants={fadeInOut(0.35)}
                onClick={onClose}
                className="panel__backdrop"
              ></motion.div>
              <div
                className={`panel__container ${
                  variant === "right"
                    ? "panel__container--right"
                    : "panel__container--left"
                }`}
              >
                <OverlayScrollbarsComponent
                  options={{
                    scrollbars: {
                      autoHide: "scroll",
                    },
                  }}
                >
                  <div className="panel__wrapper">
                    <div className="panel__header">
                      <div className="header__left">
                        <Logo />
                      </div>
                      <div className="header__right">
                        <button
                          onClick={onClose}
                          className="header__button-close"
                        >
                          <BiX />
                        </button>
                      </div>
                    </div>
                    <div className="panel__content">{children}</div>
                  </div>
                </OverlayScrollbarsComponent>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </Portal>
  );
};

export default Panel;
