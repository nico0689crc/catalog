import { useRef, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { BiSearchAlt, BiX } from "react-icons/bi";
import "./InputSearchHero.css";

const InputSearchHero = () => {
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
    <form className="search-hero__form" onSubmit={onSubmitHandler}>
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
