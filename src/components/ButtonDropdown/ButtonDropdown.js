import { FaUser } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useContext, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../../contexts/AuthContext";
import cn from "classnames";
import { fadeInOut } from "../../lib/motion/fadeInOut";
import "./ButtonDropdown.css";

const ButtonDropdown = () => {
  const { t } = useTranslation("header", { useSuspense: false });
  const buttonRef = useRef(null);
  const dropDownRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const { logout } = useContext(AuthContext);

  const classNameDropDown = cn("dropdown-button__dropdown", {
    "dropdown-button__dropdown--visible": showDropdown,
  });

  const logOutHandler = () => {
    logout();
  };

  const showDropDownHandler = () => {
    setShowDropdown(prev => !prev);
  };

  useEffect(() => {
    const checkIfClickedOutside = event => {
      if (showDropdown && buttonRef.current && dropDownRef.current) {
        if (
          buttonRef.current.contains(event.target) ||
          dropDownRef.current.contains(event.target)
        ) {
          setShowDropdown(true);
        } else {
          setShowDropdown(false);
        }
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showDropdown]);

  return (
    <div className="dropdown-button-container">
      <button
        ref={buttonRef}
        onClick={showDropDownHandler}
        className="dropdown-button__button"
      >
        <FaUser />
      </button>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            key="dropdown-button"
            initial="from"
            animate="to"
            exit="from"
            variants={fadeInOut(0.3)}
            ref={dropDownRef}
            className={classNameDropDown}
          >
            <ul className="dropdown-button__items">
              <li className="dropdown-button__item">
                {t("dropdown_item_profile")}
              </li>
              <li onClick={logOutHandler} className="dropdown-button__item">
                {t("dropdown_item_logout")}
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ButtonDropdown;
