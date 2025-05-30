import RequestHttp from '@/api';
import {PageData, ReqPage} from '@/api/interface';
import {
  Disease,
  ReqCreateDisease,
  ReqUpdateDisease,
} from '@/api/interface/knowledge/disease';

// * 获取病害
export const getDisease = async () => {
  return RequestHttp.instance.get<Disease[]>('/knowledge/disease');
};

// * 获取病害列表
export const getDiseaseList = async (params: ReqPage) => {
  return RequestHttp.instance.get<PageData<Disease>>(
    '/knowledge/disease/list',
    params,
  );
};

// * 获取病害详情
export const getDiseaseDetail = async (id: number) => {
  return RequestHttp.instance.get<Disease>(`/knowledge/disease/${id}`);
};

// * 创建病害
export const createDisease = async (data: ReqCreateDisease) => {
  return RequestHttp.instance.post<Disease>('/knowledge/disease', data);
};

// * 更新病害
export const updateDisease = async (id: number, data: ReqUpdateDisease) => {
  return RequestHttp.instance.patch<Disease>(`/knowledge/disease/${id}`, data);
};

// * 删除病害
export const deleteDisease = async (id: number) => {
  return RequestHttp.instance.delete<Disease>(`/knowledge/disease/${id}`);
};
