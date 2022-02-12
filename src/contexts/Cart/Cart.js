import { createContext, useCallback, useEffect, useReducer } from "react";
import { reducerActions } from "./actions";
import {
  increaseItemQuantity,
  decreaseItemQuantity,
  removeItemFromCart,
  getFinalState,
} from "./utils";

const LOCALSTORAGE_CART_NAME = "cartItemsCatalog";

const defaultValuesContext = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  increaseItemQuantity: () => {},
  decreaseItemQuantity: () => {},
  removeItemFromCart: () => {},
};

const defaultValuesReducer = { items: [], totalItems: 0, totalPrice: 0 };

const reducer = (state, action) => {
  switch (action.type) {
    case reducerActions.INCREASE_ITEM_QUANTITY:
      const resultInc = increaseItemQuantity(state.items, action.product);

      return getFinalState(resultInc);
    case reducerActions.DECREASE_ITEM_QUANTITY:
      const resultDec = decreaseItemQuantity(state.items, action.product);

      return getFinalState(resultDec);
    case reducerActions.REMOVE_ITEM:
      const resultFiltered = removeItemFromCart(state.items, action.product);

      return getFinalState(resultFiltered);
    case reducerActions.INITIALIZE_CART_ITEMS:
      return { ...action.cart };
    default:
      break;
  }
};

export const useCart = () => {
  const [cartState, dispatch] = useReducer(reducer, defaultValuesReducer);

  const increaseItemQuantity = useCallback(product => {
    dispatch({ type: reducerActions.INCREASE_ITEM_QUANTITY, product });
  }, []);

  const decreaseItemQuantity = useCallback(product => {
    dispatch({ type: reducerActions.DECREASE_ITEM_QUANTITY, product });
  }, []);

  const removeItemFromCart = useCallback(product => {
    dispatch({ type: reducerActions.REMOVE_ITEM, product });
  }, []);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME));

    if (cart && cart.items && cart.totalItems && cart.totalPrice) {
      dispatch({ type: reducerActions.INITIALIZE_CART_ITEMS, cart });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCALSTORAGE_CART_NAME, JSON.stringify(cartState));
  }, [cartState]);

  return {
    cartState,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeItemFromCart,
  };
};

export const CartContext = createContext(defaultValuesContext);

export const CartProvider = ({ children }) => {
  const {
    cartState,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeItemFromCart,
  } = useCart();

  return (
    <CartContext.Provider
      value={{
        ...cartState,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeItemFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
