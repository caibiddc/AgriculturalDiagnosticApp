import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from '@/components/ui/toast';
import {ResultEnum} from '@/enums';
import {store} from '@/store'; // 导入 store
import {removeToken, setAuthenticated} from '@/store/modules/authSlice';
import NetInfo from '@react-native-community/netinfo';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import {AxiosCanceler} from './helper/axiosCancel';
import {checkStatus} from './helper/checkStatus';
import {
  ApiResponse,
  CustomAxiosError,
  CustomInternalAxiosRequestConfig,
  DeleteConfig,
  GetConfig,
  PostConfig,
  PutConfig,
} from './interface';

const config = {
  baseURL: 'http://10.114.248.186:5000/api',
  timeout: 10000,
  withCredentials: true,
};

const axiosCanceler = new AxiosCanceler();

class RequestHttp {
  service: AxiosInstance;
  toast: ReturnType<typeof useToast>;

  // 单例模式
  static instance: RequestHttp;

  private constructor(
    config: AxiosRequestConfig,
    toast: ReturnType<typeof useToast>,
  ) {
    this.service = axios.create(config);
    this.toast = toast;

    this.service.interceptors.request.use(
      async (config: CustomInternalAxiosRequestConfig) => {
        config.cancel ??= true;
        config.cancel && axiosCanceler.addPending(config);
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
      (
        response: AxiosResponse & {config: CustomInternalAxiosRequestConfig},
      ) => {
        const {data, config} = response;

        // * 在请求结束后，移除本次请求
        axiosCanceler.removePending(config);

        if (
          data.code &&
          data.code !== ResultEnum.SUCCESS &&
          data.code !== ResultEnum.CREATE_SUCCESS &&
          data.code !== ResultEnum.DELETE_SUCCESS
        ) {
          this.toast.show({
            placement: 'top',
            duration: 3000,
            render: ({id}) => (
              <Toast nativeID={`toast-${id}`} action="error" variant="solid">
                <ToastTitle>Error</ToastTitle>
                <ToastDescription>{data.message}</ToastDescription>
              </Toast>
            ),
          });
          return Promise.reject(data);
        }

        return data;
      },
      async (error: CustomAxiosError) => {
        const {response} = error;
        // 请求取消单独判断，不需要提示错误信息
        if (error.message === 'canceled') {
          return Promise.reject(error);
        }

        // 请求超时单独判断，请求超时没有 response
        if (error.message.indexOf('timeout') !== -1)
          this.toast.show({
            placement: 'top',
            duration: 3000,
            render: ({id}) => (
              <Toast nativeID={`toast-${id}`} action="error" variant="solid">
                <ToastTitle>请求超时</ToastTitle>
                <ToastDescription>请求超时，请稍后再试。</ToastDescription>
              </Toast>
            ),
          });
        if (error.message.indexOf('Network Error') !== -1)
          this.toast.show({
            placement: 'top',
            duration: 3000,
            render: ({id}) => (
              <Toast nativeID={`toast-${id}`} action="error" variant="solid">
                <ToastTitle>网络错误</ToastTitle>
                <ToastDescription>网络错误！请您稍后重试</ToastDescription>
              </Toast>
            ),
          });

        if (response) {
          // 登录失效（status == 401）
          if (response.status === 401) {
            store.dispatch(removeToken());
            store.dispatch(setAuthenticated(false));
            this.toast.show({
              placement: 'top',
              duration: 3000,
              render: ({id}) => (
                <Toast nativeID={`toast-${id}`} action="error" variant="solid">
                  <ToastTitle>未授权</ToastTitle>
                  <ToastDescription>登录超时，请重新登陆。</ToastDescription>
                </Toast>
              ),
            });
          }
          // 其他状态码错误
          error.config.toast &&
            // @ts-ignore
            checkStatus(response.status, this.toast, response?.data?.message);
          console.log(response.data);
        }

        // 检查网络连接
        const state = await NetInfo.fetch();
        if (!state.isConnected) {
          this.toast.show({
            placement: 'top',
            duration: 3000,
            render: ({id}) => (
              <Toast nativeID={`toast-${id}`} action="error" variant="solid">
                <ToastTitle>网络错误</ToastTitle>
                <ToastDescription>请检查您的网络连接状态。</ToastDescription>
              </Toast>
            ),
          });
          return Promise.reject(new Error('No internet connection'));
        }

        return Promise.reject(error);
      },
    );
  }

  static initialize(toast: ReturnType<typeof useToast>) {
    if (!RequestHttp.instance) {
      RequestHttp.instance = new RequestHttp(config, toast);
    }
    return RequestHttp.instance;
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

export default RequestHttp;
