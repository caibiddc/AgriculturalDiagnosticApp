import {AxiosCanceler} from '../api/helper/axiosCancel';
import {resolveApiBaseURL} from '../api/endpoint';
import type {CustomInternalAxiosRequestConfig} from '../api/interface';

describe('mobile API configuration', () => {
  it('resolves the current server address', () => {
    expect(resolveApiBaseURL({protocol: 'https', baseURL: 'agri.example.edu.cn/api'}))
      .toBe('https://agri.example.edu.cn/api');
    expect(resolveApiBaseURL({protocol: 'http', baseURL: '192.168.0.5:3000/api/'}))
      .toBe('http://192.168.0.5:3000/api');
  });
  it('falls back when configuration has not been loaded', () => {
    expect(resolveApiBaseURL()).toBe('https://www.mmdxiaoxin.top/api');
  });
});

describe('duplicate request cancellation', () => {
  const makeConfig = () => ({
    method: 'get',
    url: '/api/diagnosis/history',
  } as CustomInternalAxiosRequestConfig);

  it('does not abort a successfully completed request', () => {
    const canceler = new AxiosCanceler();
    const config = makeConfig();
    canceler.addPending(config);
    const signal = config.signal!;
    canceler.removePending(config);
    expect(signal.aborted).toBe(false);
    canceler.removeAllPending();
    expect(signal.aborted).toBe(false);
  });

  it('cancels only the superseded request, not its replacement', () => {
    const canceler = new AxiosCanceler();
    const oldRequest = makeConfig();
    const newRequest = makeConfig();
    canceler.addPending(oldRequest);
    canceler.addPending(newRequest);
    expect(oldRequest.signal?.aborted).toBe(true);
    expect(newRequest.signal?.aborted).toBe(false);
    canceler.removePending(oldRequest);
    expect(newRequest.signal?.aborted).toBe(false);
    canceler.removeAllPending();
    expect(newRequest.signal?.aborted).toBe(true);
  });
});
