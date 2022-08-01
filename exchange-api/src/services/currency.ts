const precision = 100;

function getCurrencyValue(min: number, max: number) {
  return (
    Math.floor(
      Math.random() * (max * precision - min * precision) + min * precision
    ) / precision
  );
}

function log(serviceName: string, currency: string, value: number) {
  console.log(
    `new currency check from service ${serviceName}, currency: ${currency} value: ${value}`
  );
}

class CurrencyService {
  serviceA(currency: string) {
    const currencyValue = getCurrencyValue(3, 7);

    log("A", currency, currencyValue);

    return currencyValue;
  }
  serviceB(currency: string) {
    const currencyValue = getCurrencyValue(5, 9);

    log("B", currency, currencyValue);

    return currencyValue;
  }

  serviceC(currency: string) {
    const currencyValue = getCurrencyValue(4, 6);

    log("C", currency, currencyValue);

    return currencyValue;
  }
}

export default new CurrencyService();
