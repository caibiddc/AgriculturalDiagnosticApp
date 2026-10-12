import qs from 'qs';
import {CustomInternalAxiosRequestConfig} from '../interface';

// Track each request by method, URL and body to cancel only pending duplicates.
const pendingMap = new Map<string, AbortController>();

export const getPendingUrl = (config: CustomInternalAxiosRequestConfig) =>
  [
    config.method,
    config.url,
    qs.stringify(config.data),
    qs.stringify(config.params),
  ].join('&');

export class AxiosCanceler {
  addPending(config: CustomInternalAxiosRequestConfig) {
    const url = getPendingUrl(config);
    pendingMap.get(url)?.abort();
    const controller = new AbortController();
    config.signal = controller.signal;
    pendingMap.set(url, controller);
  }

  removePending(config: CustomInternalAxiosRequestConfig) {
    const url = getPendingUrl(config);
    const controller = pendingMap.get(url);
    // An older cancelled request must not clear its newer replacement.
    if (controller && controller.signal === config.signal) {
      pendingMap.delete(url);
    }
  }

  removeAllPending() {
    pendingMap.forEach(controller => controller.abort());
    pendingMap.clear();
  }
}
