import { useRef, useState } from "react";
import { BiSearchAlt, BiX } from "react-icons/bi";
import "./InputSearchHero.css";

const InputSearchHero = () => {
  const inputRef = useRef();
  const [showClearInput, setShowClearInput] = useState(false);

  const onKeyUpHandler = () => {
    setShowClearInput(inputRef.current.value.length > 0);
  };

  const onClearInputHandler = () => {
    inputRef.current.value = "";
    setShowClearInput(false);
  };

  return (
    <form className="search-hero__form">
      <div className="search-hero__container">
        <div className="search-hero__input-group">
          <input
            ref={inputRef}
            onKeyUp={onKeyUpHandler}
            type="text"
            placeholder="Search your product from here"
            className="search-hero__input"
          />

          {showClearInput && (
            <button
              type="button"
              onClick={onClearInputHandler}
              className="search-hero__clear-button"
            >
              <span className="clear-button__icon">
                <BiX />
              </span>
            </button>
          )}
        </div>
        <button type="submit" className="search-hero__submit-button">
          <span className="submit-button__icon">
            <BiSearchAlt />
          </span>
          <span className="submit-button__text">Search</span>
        </button>
      </div>
    </form>
  );
};

export default InputSearchHero;
