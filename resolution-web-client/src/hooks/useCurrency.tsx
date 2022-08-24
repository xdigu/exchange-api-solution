import { useContext } from "react";
import { CurrencyContext } from "../components/context";

export default function useCurrency() {
  const context = useContext(CurrencyContext);

  if (!context) {
    throw new Error("you must pass CurrencyContext as provider");
  }

  return context;
}
