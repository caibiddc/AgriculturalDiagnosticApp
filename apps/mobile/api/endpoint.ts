/**
 * Base URL must be computed from the latest Redux config for each request.
 * Do not cache it during app startup: AsyncStorage is loaded asynchronously.
 */
export interface ApiServerConfig {
  protocol: 'http' | 'https';
  baseURL: string;
}
export function resolveApiBaseURL(apiConfig?: ApiServerConfig): string {
  if (!apiConfig?.baseURL?.trim()) {
    return 'https://www.mmdxiaoxin.top/api';
  }
  return `${apiConfig.protocol}://${apiConfig.baseURL.trim().replace(/^\/+|\/+$/g, '')}`;
}
