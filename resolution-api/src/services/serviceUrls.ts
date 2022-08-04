import { env } from 'process';

const isDockerEnvironment = env.DOCKER ? true : false;

const localHostBaseUrl = 'localhost';
const exChangeBaseUrl = 'exchange-api';
const resolutionBaseUrl = 'resolution-api';

class UrlService {
  private getUrlEnvironment(localUrl: string, dockerUrl: string) {
    if (isDockerEnvironment) {
      return dockerUrl;
    }

    return localUrl;
  }

  private get exchangeBaseUrl() {
    const baseUrl = this.getUrlEnvironment(`${localHostBaseUrl}`, `${exChangeBaseUrl}`);

    return `http://${baseUrl}:8080`;
  }

  private get resolutionBaseUrl() {
    const baseUrl = this.getUrlEnvironment(`${localHostBaseUrl}`, `${resolutionBaseUrl}`);

    return `http://${baseUrl}:8081`;
  }

  serviceAUrl(currencyName: string) {
    return `${this.exchangeBaseUrl}/service-a/exchange?moeda=${currencyName}`;
  }

  serviceBUrl(currencyName: string) {
    return `${this.exchangeBaseUrl}/service-b/exchange?curr=${currencyName}`;
  }

  serviceCUrl() {
    return `${this.exchangeBaseUrl}/service-c/exchange`;
  }

  callBackUrl() {
    return `${this.resolutionBaseUrl}/api/callback`;
  }
}

export default new UrlService();
