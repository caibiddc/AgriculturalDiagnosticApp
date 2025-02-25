import {store} from '@/store'; // 导入 store
import {removeToken} from '@/store/modules/authSlice';
import NetInfo from '@react-native-community/netinfo';
import {NavigationContainerRef} from '@react-navigation/native';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import {Alert} from 'react-native';
import {AxiosCanceler} from './helper/axiosCancel';
import {checkStatus} from './helper/checkStatus';
import {ApiResponse} from './interface';
// import NProgress from '@/config/nprogress';
// import {
//   showFullScreenLoading,
//   tryHideFullScreenLoading,
// } from '@/config/serviceLoading';
import {RootStackParamList} from '@/routes/types';

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  loading?: boolean;
  cancel?: boolean;
}
export type GetConfig = Omit<AxiosRequestConfig, 'params'> & {
  loading?: boolean;
  cancel?: boolean;
};
export type PostConfig = AxiosRequestConfig & {
  loading?: boolean;
  cancel?: boolean;
};
export type PutConfig = AxiosRequestConfig & {
  loading?: boolean;
  cancel?: boolean;
};
export type DeleteConfig = Omit<AxiosRequestConfig, 'params'> & {
  loading?: boolean;
  cancel?: boolean;
};
export type DownloadConfig = Omit<PostConfig, 'responseType'>;

const config = {
  baseURL: '/api',
  timeout: 10000,
  withCredentials: true,
};

const axiosCanceler = new AxiosCanceler();

let navigation: NavigationContainerRef<RootStackParamList> | null = null;

class RequestHttp {
  service: AxiosInstance;

  public constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config);

    this.service.interceptors.request.use(
      async (config: CustomAxiosRequestConfig) => {
        // 检查网络连接
        const state = await NetInfo.fetch();
        if (!state.isConnected) {
          Alert.alert('No internet connection', 'Please check your network.');
          return Promise.reject(new Error('No internet connection'));
        }

        // NProgress.start();
        config.cancel ??= true;
        config.cancel && axiosCanceler.addPending(config);
        config.loading ??= true;
        // config.loading && showFullScreenLoading();

        const token = store.getState().auth.token;
        if (config.headers && typeof config.headers.set === 'function') {
          token && config.headers.set('Authorization', `Bearer ${token}`);
        }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      },
    );

    this.service.interceptors.response.use(
      (response: AxiosResponse & {config: CustomAxiosRequestConfig}) => {
        const {data, config} = response;
        // NProgress.done();
        axiosCanceler.removePending(config);
        // config.loading && tryHideFullScreenLoading();

        if (data.code && data.code !== 200) {
          Alert.alert('Error', data.msg);
          return Promise.reject(data);
        }

        return data;
      },
      async (error: AxiosError) => {
        const {response} = error;
        // NProgress.done();
        // tryHideFullScreenLoading();

        if (error.message === 'canceled') {
          return Promise.reject(error);
        }

        if (error.message.indexOf('timeout') !== -1)
          Alert.alert('Error', '请求超时，请稍后再试');
        if (error.message.indexOf('Network Error') !== -1)
          Alert.alert('Error', '网络错误！请您稍后重试');

        if (response && response.status === 401) {
          store.dispatch(removeToken());
          Alert.alert('Error', '登录失效，请重新登录');
          if (navigation) {
            navigation.reset({
              index: 0,
              routes: [{name: 'Login'}],
            });
          }
        }

        if (response) {
          checkStatus(response.status);
        }

        return Promise.reject(error);
      },
    );
  }

  get<T>(
    url: string,
    params?: object,
    _object: GetConfig = {},
  ): Promise<ApiResponse<T>> {
    return this.service.get(url, {params, ..._object});
  }

  post<T>(
    url: string,
    data?: object,
    _object: PostConfig = {},
  ): Promise<ApiResponse<T>> {
    return this.service.post(url, data, _object);
  }

  put<T>(
    url: string,
    data?: object,
    _object: PutConfig = {},
  ): Promise<ApiResponse<T>> {
    return this.service.put(url, data, _object);
  }

  delete<T>(
    url: string,
    params?: any,
    _object: DeleteConfig = {},
  ): Promise<ApiResponse<T>> {
    return this.service.delete(url, {params, ..._object});
  }
}

// 设置 React Navigation 的导航
export const setNavigation = (
  nav: NavigationContainerRef<RootStackParamList>,
) => {
  navigation = nav;
};

export const removeNavigation = () => {
  navigation = null;
};

export default new RequestHttp(config);
