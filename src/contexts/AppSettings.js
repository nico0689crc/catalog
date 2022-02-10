import { createContext, useEffect, useState } from "react";
import useWindowSize from "react-use/lib/useWindowSize";

export const BREAK_POINTS = {
  mobile: 1024,
  tablet: 1280,
};

const initialState = {
  breaksPoints: null,
  isMobileView: null,
  currentWidth: null,
  logo: {
    url: "https://pickbazar-react.vercel.app/_next/image?url=https%3A%2F%2Fpickbazarlaravel.s3.ap-southeast-1.amazonaws.com%2F860%2FPickBazar.png&w=828&q=75",
  },
  heroBanners: {},
  displayHeaderFixed: null,
  setDisplayHeaderFixed: () => {},
  displaySearchInputMobile: null,
  setDisplaySearchInputMobile: () => {},
  currency: null,
};

export const AppSettingsContext = createContext(initialState);

export const AppSettingProvider = ({ children }) => {
  const { width } = useWindowSize();
  const [displayHeaderFixed, setDisplayHeaderFixed] = useState(false);
  const [displaySearchInputMobile, setDisplaySearchInputMobile] =
    useState(false);
  const [isMobileView, setIsMobileView] = useState(width > BREAK_POINTS.mobile);
  const currency = useState("USD")[0];

  useEffect(() => {
    if (width > BREAK_POINTS.mobile) {
      setDisplaySearchInputMobile(false);
      setIsMobileView(false);
    } else {
      setIsMobileView(true);
    }
  }, [width]);

  return (
    <AppSettingsContext.Provider
      value={{
        isMobileView: isMobileView,
        currentWidth: width,
        displayHeaderFixed,
        setDisplayHeaderFixed,
        displaySearchInputMobile,
        setDisplaySearchInputMobile,
        logo: initialState.logo,
        currency: currency,
      }}
    >
      {children}
    </AppSettingsContext.Provider>
  );
};
