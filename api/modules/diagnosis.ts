import RequestHttp from '@/api';
import {ImagePickerResult} from '@/hooks/useImagePicker';
import {
  DiagnosisHistory,
  DiagnosisStatistics,
  RemoteService,
  ReqDiagnosisHistoryList,
  ResDiagnosisHistoryList,
} from '../interface';

// * 病害数据诊断
export const startDiagnoseImage = async (diagnosisId: string | number) =>
  RequestHttp.instance.get<any>(`/diagnosis/${diagnosisId}`);

// * 上传病害图片
export const uploadDiseaseImage = async (image: ImagePickerResult) => {
  const formData = new FormData();
  formData.append('file', image);
  return RequestHttp.instance.post<null>('/diagnosis/upload', formData, {
    timeout: 60000,
    headers: {'Content-Type': 'multipart/form-data'},
  });
};

// * 获取诊断支持信息
export const getDiagnosisSupport = async () => {
  return RequestHttp.instance.get<RemoteService[]>('/diagnosis/support');
};

// * 获取诊断统计信息
export const getDiagnosisStatistics = async () => {
  return RequestHttp.instance.get<DiagnosisStatistics>('/diagnosis/statistics');
};

// * 获取病害诊断历史
export const getDiagnosisHistory = async () =>
  RequestHttp.instance.get<DiagnosisHistory[]>('/diagnosis/history');

// * 获取病害诊断历史(分页)
export const getDiagnosisHistoryList = async (
  params: ReqDiagnosisHistoryList,
) =>
  RequestHttp.instance.get<ResDiagnosisHistoryList>(
    '/diagnosis/history/list',
    params,
  );

// * 删除诊断历史
export const deleteDiagnosisHistory = async (id: number) => {
  return RequestHttp.instance.delete<null>(`/diagnosis/history/${id}`);
};

// * 批量删除诊断历史
export const deleteDiagnosisHistories = async (params: {
  diagnosisIds: string;
}) => {
  return RequestHttp.instance.delete<null>(`/diagnosis/history`, params);
};
