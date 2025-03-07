import RequestHttp from '@/api';
import {
  ResUserDetail,
  ResUserList,
  ResUserProfile,
  UserCreateParams,
  UserListParams,
  ReqUpdateProfile,
  UserUpdateParams,
} from '../interface';

export const getUserList = (data: UserListParams) =>
  RequestHttp.instance.get<ResUserList>('/user/list', data, {loading: false});

export const getUserProfile = () =>
  RequestHttp.instance.get<ResUserProfile>(
    '/user/profile',
    {},
    {loading: false},
  );

export const getAvatar = (): Promise<Blob> =>
  RequestHttp.instance.get(
    `/user/avatar`,
    {},
    {loading: false, responseType: 'blob'},
  ) as unknown as Promise<Blob>;

export const uploadAvatar = (data: FormData) =>
  RequestHttp.instance.post<null>('/user/avatar', data, {
    loading: false,
    headers: {'Content-Type': 'multipart/form-data'},
  });

export const updateUserProfile = (data: ReqUpdateProfile) =>
  RequestHttp.instance.put<null>('/user/profile', data);

export const resetUserPassword = (data: {
  currentPassword: string;
  newPassword: string;
}) =>
  RequestHttp.instance.put<null>('/user/reset/password', data, {
    loading: false,
  });

export const createUser = (data: UserCreateParams) =>
  RequestHttp.instance.post<null>('/user/create', data);

export const getUserById = (id: number | string) =>
  RequestHttp.instance.get<ResUserDetail>(`/user/${id}`, {}, {loading: false});

export const updateUserById = (id: number | string, data: UserUpdateParams) =>
  RequestHttp.instance.put<null>(`/user/${id}`, data, {loading: false});

export const deleteUserById = (id: number | string) =>
  RequestHttp.instance.delete<null>(`/user/${id}`);

export const resetUserById = (id: number | string) =>
  RequestHttp.instance.put<null>(`/user/${id}/reset/password`);

export const logoutApi = () => RequestHttp.instance.post<null>('/user/logout');
