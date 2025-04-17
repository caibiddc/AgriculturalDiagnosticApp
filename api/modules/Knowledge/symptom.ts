import RequestHttp from '@/api';
import {PageData, ReqPage} from '@/api/interface';
import {Symptom} from '@/api/interface/knowledge/symptom';

// * 获取病害列表
export const getSymptoms = async () => {
  return RequestHttp.instance.get<Symptom[]>('/knowledge/symptom');
};

// * 获取病害症状列表
export const getSymptomList = async (params: ReqPage) => {
  return RequestHttp.instance.get<PageData<Symptom>>(
    '/knowledge/symptom/list',
    params,
  );
};

// * 创建病害症状
export const createSymptom = async (data: Symptom) => {
  return RequestHttp.instance.post<Symptom>('/knowledge/symptom', data);
};

// * 更新病害症状
export const updateSymptom = async (id: number, data: Symptom) => {
  return RequestHttp.instance.patch<Symptom>(`/knowledge/symptom/${id}`, data);
};

// * 删除病害症状
export const deleteSymptom = async (id: number) => {
  return RequestHttp.instance.delete<Symptom>(`/knowledge/symptom/${id}`);
};

// * 根据疾病获取病害症状
export const getSymptomsByDiseaseId = async (diseaseId: number) => {
  return RequestHttp.instance.get<Symptom[]>(
    `/knowledge/symptom/disease/${diseaseId}`,
  );
};

// * 根据疾病获取病害症状
export const getSymptomListByDiseaseId = async (
  diseaseId: number,
  params: ReqPage,
) => {
  return RequestHttp.instance.get<PageData<Symptom>>(
    `/knowledge/symptom/disease/${diseaseId}/list`,
    params,
  );
};
