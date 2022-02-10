import { createContext, useState, useCallback, useEffect } from "react";

const initialState = {
  isLoggedIn: false,
  userId: null,
  token: null,
  role: null,
  permissions: null,
  login: () => {},
  logout: () => {},
};

export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
  const { login, logout, userId, token, attributes } = useAuth();
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        attributes: attributes,
        login: login,
        logout: logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(false);
  const [attributes, setAttributes] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const LOCALSTORAGE_ITEM_NAME = "userDataCatalogFront";

  const login = useCallback((uid, attributes, expirationDate) => {
    setUserId(uid);
    setToken(attributes.token);
    setAttributes(attributes);

    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      LOCALSTORAGE_ITEM_NAME,
      JSON.stringify({
        userId: uid,
        attributes: attributes,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem(LOCALSTORAGE_ITEM_NAME);
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem(LOCALSTORAGE_ITEM_NAME));
    if (
      storedData &&
      storedData.userId &&
      storedData.attributes &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.attributes,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  return { login, logout, userId, token, attributes };
};
