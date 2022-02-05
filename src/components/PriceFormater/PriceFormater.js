import { useContext } from "react";
import CurrencyFormat from "react-currency-format";
import { AppSettingsContext } from "../../contexts/AppSettings";

const PriceFormater = ({ price }) => {
  const { currency } = useContext(AppSettingsContext);

  return (
    <CurrencyFormat
      value={price}
      displayType={"text"}
      thousandSeparator={true}
      decimalSeparator=","
      prefix={`${currency} `}
      thousandSeparator="."
      fixedDecimalScale={true}
      decimalScale={2}
      renderText={value => value}
    />
  );
};

export default PriceFormater;
