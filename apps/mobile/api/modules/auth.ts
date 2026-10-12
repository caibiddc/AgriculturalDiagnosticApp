import RequestHttp from '@/api';
import {
  ReqLogin,
  ReqRegister,
  ResAuthButtons,
  ResAuthDict,
  ResLogin,
} from '../interface';

// * 用户登录接口
export const loginApi = (params: ReqLogin) =>
  RequestHttp.instance.post<ResLogin>(
    `/auth/login`,
    {
      ...params,
    },
    {toast: true},
  );

// * 用户注册接口
export const registerApi = (params: ReqRegister) =>
  RequestHttp.instance.post<null>(`/auth/register`, {
    ...params,
  });

// * 获取按钮权限
export const getAuthorButtons = () =>
  RequestHttp.instance.get<ResAuthButtons>(`/auth/buttons`);

// * 获取菜单列表
export const getMenuList = () =>
  RequestHttp.instance.get<Menu.MenuOptions[]>(`/auth/route`);

// * 获取角色字典
export const getRoleDict = () =>
  RequestHttp.instance.get<ResAuthDict>(`/auth/role-dict`);
