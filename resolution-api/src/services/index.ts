import observer from './observer';
import serviceUrls from './serviceUrls';
import responseParser from './responseParser';

class Service {
  async exchange(currency: string) {
    const data = await Promise.race([
      fetch(serviceUrls.serviceAUrl(currency), {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
        .then(responseParser.parseJson)
        .then(responseParser.parseResponseServiceA)
        .catch(responseParser.errorHandler),

      fetch(serviceUrls.serviceBUrl(currency), {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
        .then(responseParser.parseJson)
        .then(responseParser.parseResponseServiceB)
        .catch(responseParser.errorHandler),

      fetch(serviceUrls.serviceCUrl(), {
        method: 'POST',
        body: JSON.stringify({ tipo: currency, callback: serviceUrls.callBackUrl() }),
        headers: { 'Content-Type': 'application/json' },
      })
        .then(responseParser.parseJson)
        .then(responseParser.getServiceCResponse)
        .then(responseParser.parseResponseServiceC)
        .catch(responseParser.errorHandler),
    ]);

    return data;
  }

  async callBack(exchangeData: Data) {
    observer.notify(exchangeData);
  }
}

export default Service;
