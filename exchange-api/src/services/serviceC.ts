import observable from './observable';
import currencyService from './currency';
import { controllerTimeout } from '../utils';

function formatUrl(url: string) {
  const urlProtocol = 'http';

  const urlHasProtocol = url.startsWith(urlProtocol);

  return urlHasProtocol ? url : `${urlProtocol}://${url}`;
}

function logError(err: Error) {
  console.log(err);
}

async function getNotification(data: Data) {
  const currencyValue = currencyService.serviceC(data.type);

  const url = formatUrl(data.callback);

  const factor = 1000;

  const body = {
    cid: data.cid,
    f: factor,
    t: data.type,
    v: currencyValue * factor,
  };

  const options = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  };

  await controllerTimeout();

  fetch(url, options).catch(logError);
}

observable.subscribe(getNotification);
