import observer from './observer';

declare global {
  interface ExchangeData {
    currency: string;
    value: string;
    serviceName: string;
  }
}

interface ServiceAResponse {
  cotacao: number;
  moeda: string;
  symbol: string;
}
interface ServiceBResponse {
  fator: number;
  currency: string;
  valor: string;
}
interface ServiceCResponse {
  mood: string;
  cid: string;
  mensagem: string;
}

async function getServiceCResponse(resp: ServiceCResponse) {
  const data: Data = await new Promise((resolve, reject) => {
    const timeOut = setTimeout(() => {
      observer.unsubscribe(listenObserver);

      reject('Cancel Service C');
    }, 1000);

    function listenObserver(data: Data) {
      if (data.cid === resp.cid) {
        clearTimeout(timeOut);

        observer.unsubscribe(listenObserver);

        resolve(data);
      }
    }

    observer.subscribe(listenObserver);
  });

  return data;
}

function parseResponseServiceA(response: ServiceAResponse): ExchangeData {
  return { currency: response.moeda, value: String(response.cotacao), serviceName: 'A' };
}

function parseResponseServiceB(response: ServiceBResponse): ExchangeData {
  return { currency: response.currency, value: String(Number(response.valor) / response.fator), serviceName: 'B' };
}

function parseResponseServiceC(response: Data): ExchangeData {
  return { currency: response.t, value: String(response.v / response.f), serviceName: 'C' };
}

async function parseJson(response: Response) {
  return await response.json();
}

function errorHandler(err: Response) {
  console.log(err);
}

class Service {
  async exchange(currency: string) {
    const data = await Promise.race([
      fetch(`http://exchange-api:8080/service-a/exchange?moeda=${currency}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
        .then(parseJson)
        .then(parseResponseServiceA)
        .catch(errorHandler),

      fetch(`http://exchange-api:8080/service-b/exchange?curr=${currency}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
        .then(parseJson)
        .then(parseResponseServiceB)
        .catch(errorHandler),

      fetch('http://exchange-api:8080/service-c/exchange', {
        method: 'POST',
        body: JSON.stringify({ tipo: currency, callback: 'http://resolution-api:8081/api/callback' }),
        headers: { 'Content-Type': 'application/json' },
      })
        .then(parseJson)
        .then(getServiceCResponse)
        .then(parseResponseServiceC)
        .catch(errorHandler),
    ]);

    return data;
  }

  async callBack(exchangeData: Data) {
    observer.notify(exchangeData);
  }
}

export default Service;
