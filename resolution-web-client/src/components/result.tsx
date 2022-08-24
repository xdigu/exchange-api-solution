import useCurrency from "../hooks/useCurrency";

function Result() {
  const { data, clearState } = useCurrency();

  if (!data) {
    return null;
  }

  return (
    <div>
      <p>
        One {`${data.moeda} is equal to ${data.cotacao} ${data.comparativo}`}
      </p>

      <button onClick={clearState}>new search</button>
    </div>
  );
}

export default Result;
