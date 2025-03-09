import {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';

export interface BaseResponse {
  code: number;
  message: string;
}

// * 请求响应参数(包含data)
export interface ApiResponse<T = any> extends BaseResponse {
  data?: T;
}

export interface ListData<T = any> {
  list: T[];
}

export interface PageData<T = any> {
  list: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  };
}

export interface CustomInternalAxiosRequestConfig
  extends InternalAxiosRequestConfig {
  cancel?: boolean;
  toast?: boolean;
}
export interface CustomAxiosError extends AxiosError {
  config: CustomInternalAxiosRequestConfig;
}
export type GetConfig = Omit<AxiosRequestConfig, 'params'> & {
  cancel?: boolean;
  toast?: boolean;
};
export type PostConfig = AxiosRequestConfig & {
  cancel?: boolean;
  toast?: boolean;
};
export type PutConfig = AxiosRequestConfig & {
  cancel?: boolean;
  toast?: boolean;
};
export type DeleteConfig = Omit<AxiosRequestConfig, 'params'> & {
  cancel?: boolean;
  toast?: boolean;
};

export * from './file';
export * from './auth';
export * from './diagnosis';
export * from './user';
