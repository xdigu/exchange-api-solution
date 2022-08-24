import Currency from "./components/currency";

import "./App.css";

function App() {
  return (
    <>
      <header>
        <h1>Exchange Service</h1>
      </header>

      <div className="app-container">
        <Currency />
      </div>

      <div className="read-the-docs">
        <p>
          This app is a resolution of a challenge about create a backend service
          to get the lowest currency value from 3 different exchange services,
          each service has it own complexity to be implement.
        </p>
        <p>
          To check the challange:
          <br />
          <a
            href="https://dev.to/zanfranceschi/desafio-integracao-com-apis-4jco"
            target="_blank"
          >
            [Desafio] - Integração com Múltiplas APIs (scatter/gather)
          </a>
        </p>
      </div>
    </>
  );
}

export default App;
