import observable from "./observable";
import currencyService from "./currency";

function formatUrl(url: string) {
  const urlProtocol = "http";

  const urlHasProtocol = url.startsWith(urlProtocol);

  return urlHasProtocol ? url : `${urlProtocol}://${url}`;
}

function logError(err: Error) {
  console.log(err);
}

function getNotification(data: any) {
  const currencyValue = currencyService.serviceC(data.tipo);

  const url = formatUrl(data.callback);

  const factor = 1000;

  const body = {
    cid: data.cid,
    f: factor,
    t: data.type,
    v: currencyValue * factor,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  };

  fetch(url, options).catch(logError);
}

observable.subscribe(getNotification);
