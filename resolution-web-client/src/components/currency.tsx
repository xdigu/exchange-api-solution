import useCurrency from "../hooks/useCurrency";
import CurrencyProvider from "./context";
import GetCurrancy from "./getCurrency";
import Loading from "./loading";
import Result from "./result";

function Currency() {
  const { data, loading, error } = useCurrency();

  if (error) {
    console.error(error);
    return null;
  }

  if (loading) {
    return <Loading />;
  }

  if (data) {
    return <Result />;
  }

  return <GetCurrancy />;
}

export default () => (
  <CurrencyProvider>
    <Currency />
  </CurrencyProvider>
);
