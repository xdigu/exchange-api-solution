import { useState } from "react";
import useCurrency from "../hooks/useCurrency";

function GetCurrancy() {
  const [currencyName, setCurrencyName] = useState("");
  const { getCurrency } = useCurrency();

  function handleChange({
    currentTarget: { value },
  }: React.ChangeEvent<HTMLInputElement>) {
    setCurrencyName(value.toUpperCase());
  }

  function handleSubmit(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();

    getCurrency(currencyName);
  }

  return (
    <div>
      <input
        type="text"
        id="currency"
        onChange={handleChange}
        value={currencyName}
        placeholder="Enter currency"
      />

      <button type="button" onClick={handleSubmit}>
        search
      </button>
    </div>
  );
}

export default GetCurrancy;
