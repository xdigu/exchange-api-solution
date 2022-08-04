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

class ResponseParser {
  parseResponseServiceA(response: ServiceAResponse): ExchangeData {
    return { currency: response.moeda, value: String(response.cotacao), serviceName: 'A' };
  }

  parseResponseServiceB(response: ServiceBResponse): ExchangeData {
    return { currency: response.currency, value: String(Number(response.valor) / response.fator), serviceName: 'B' };
  }

  parseResponseServiceC(response: Data): ExchangeData {
    return { currency: response.t, value: String(response.v / response.f), serviceName: 'C' };
  }

  async getServiceCResponse(resp: ServiceCResponse) {
    const data: Data = await new Promise((resolve, reject) => {
      const timeOut = setTimeout(() => {
        observer.unsubscribe(listenObserver);

        reject('Cancel Service C');
      }, 5000);

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

  async parseJson(response: Response) {
    return await response.json();
  }

  errorHandler(err: Response) {
    console.log(err);
  }
}

export default new ResponseParser();
