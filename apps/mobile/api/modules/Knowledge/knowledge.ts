import RequestHttp from '@/api';
import {PageData} from '@/api/interface';
import {
  Disease,
  ReqCreateDisease,
  ReqDiseaseList,
  ReqUpdateDisease,
} from '@/api/interface/knowledge';

// * 获取全部病害知识
export const getKnowledge = () => {
  return RequestHttp.instance.get<Disease[]>('/knowledge');
};

// * 获取病害知识列表
export const getKnowledgeList = (params: ReqDiseaseList) => {
  return RequestHttp.instance.get<PageData<Disease>>('/knowledge/list', params);
};

// * 创建病害知识
export const createKnowledge = (data: ReqCreateDisease) => {
  return RequestHttp.instance.post<Disease>('/knowledge', data);
};

// * 更新病害知识
export const updateKnowledge = (
  id: number | string,
  data: ReqUpdateDisease,
) => {
  return RequestHttp.instance.put<Disease>(`/knowledge/${id}`, data);
};

// * 删除病害知识
export const deleteKnowledge = (id: number | string) => {
  return RequestHttp.instance.delete<null>(`/knowledge/${id}`);
};
