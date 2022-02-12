import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { BiSearchAlt, BiX } from "react-icons/bi";
import "./InputSearchHeader.css";

const InputSearch = () => {
  const { t } = useTranslation("header", { useSuspense: false });
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
    <form className="search-header__form" onSubmit={() => {}}>
      <div className="input-search-header__group">
        <input
          placeholder={t("text_input_search_placeholder")}
          type="text"
          autoComplete="off"
          className="input_search-header__input"
          onKeyUp={onKeyUpHandler}
          ref={inputRef}
        />
        <button className="input-search-header__button-submit" type="submit">
          <span>
            <BiSearchAlt />
          </span>
        </button>
        {showClearInput && (
          <button
            onClick={onClearInputHandler}
            className="input-search-header__button-clear"
            type="button"
          >
            <span>
              <BiX />
            </span>
          </button>
        )}
      </div>
    </form>
  );
};
export default InputSearch;
