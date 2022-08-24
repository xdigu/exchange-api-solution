import { createContext } from "react";

declare global {
  interface ExchangeResponse {
    cotacao: number;
    comparativo: string;
    moeda: string;
  }

  interface State {
    data: ExchangeResponse | null;
    error: null | any;
    loading: boolean;
  }

  interface CurrencyContextData extends State {
    clearState: () => void;
    getCurrency: (currency: string) => void;
  }
}

const CurrencyContext = createContext({} as CurrencyContextData);

export default CurrencyContext;
