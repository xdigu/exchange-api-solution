import { useState, useCallback } from "react";
import CurrencyContext from "./currencyContext";

const initialState = { data: null, loading: false, error: null };

interface Props {
  children: JSX.Element;
}

export { CurrencyContext };

export default function CurrencyProvider({ children }: Props) {
  const [state, setState] = useState<State>(initialState);

  const clearState = useCallback(() => {
    setState(initialState);
  }, []);

  const getCurrency = useCallback(async (cyrrency: string) => {
    if (!cyrrency) {
      return;
    }

    setState({ data: null, loading: true, error: null });

    const response = await fetch(`/api/cotacoes/${cyrrency}`)
      .then((resp) => resp.json())
      .then((data: ExchangeResponse) => {
        setState({ data, loading: false, error: null });
        return data;
      })
      .catch((err) => {
        setState({ data: null, loading: false, error: err });
      });

    return response;
  }, []);

  return (
    <CurrencyContext.Provider value={{ clearState, getCurrency, ...state }}>
      {children}
    </CurrencyContext.Provider>
  );
}
