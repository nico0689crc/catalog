import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BiSearchAlt, BiX } from "react-icons/bi";
import "./InputSearchHeader.css";

const InputSearch = () => {
  const { t } = useTranslation("header", { useSuspense: false });
  const inputRef = useRef();
  const [showClearInput, setShowClearInput] = useState(false);
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    if (inputRef.current && params.has("search")) {
      inputRef.current.value = params.get("search");
      setShowClearInput(true);
    }
  }, [params]);

  const onKeyUpHandler = () => {
    setShowClearInput(inputRef.current.value.length > 0);
  };

  const onClearInputHandler = () => {
    inputRef.current.value = "";

    if (params.has("search")) {
      params.delete("search");

      const newParamsQuery = {};

      if (params.has("category")) {
        newParamsQuery["category"] = params.get("category");
      }

      setParams(newParamsQuery);
    }

    setShowClearInput(false);
  };

  const onSubmitHandler = event => {
    event.preventDefault();

    const newParamsQuery = {};

    if (params.has("category")) {
      newParamsQuery["category"] = params.get("category");
    }

    newParamsQuery["search"] = inputRef.current.value;

    setParams(newParamsQuery);
  };

  return (
    <form className="search-header__form" onSubmit={onSubmitHandler}>
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
