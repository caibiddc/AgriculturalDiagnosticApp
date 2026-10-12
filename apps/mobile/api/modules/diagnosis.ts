import RequestHttp from '@/api';
import {ImagePickerResult} from '@/hooks/useImagePicker';
import {
  DiagnoseResult,
  DiagnosisFeedback,
  DiagnosisHistory,
  DiagnosisStatistics,
  DiagnosisSupport,
  PageData,
  ReqCreateDiagnosisFeedback,
  ReqDiagnosisHistoryList,
  ReqPage,
  ReqStartDiagnoseDisease,
  ReqUpdateDiagnosisFeedback,
  ResDiagnosisHistoryList,
} from '../interface';

// * 病害数据诊断
export const startDiagnoseImage = async (diagnosisId: string | number) =>
  RequestHttp.instance.get<any>(`/diagnosis/${diagnosisId}`);

// * 上传病害图片
export const uploadDiseaseImage = async (image: ImagePickerResult) => {
  const formData = new FormData();
  formData.append('file', image);
  return RequestHttp.instance.post<DiagnosisHistory>(
    '/diagnosis/upload',
    formData,
    {
      timeout: 60000,
      headers: {'Content-Type': 'multipart/form-data'},
    },
  );
};

// * 开始诊断
export const startDiagnosis = async (params: ReqStartDiagnoseDisease) => {
  const {diagnosisId, ...data} = params;
  return RequestHttp.instance.post<DiagnoseResult>(
    `/diagnosis/${diagnosisId}/start`,
    data,
  );
};

// * 开始诊断（异步）
export const startDiagnosisAsync = async (params: ReqStartDiagnoseDisease) => {
  const {diagnosisId, ...data} = params;
  return RequestHttp.instance.post<DiagnoseResult>(
    `/diagnosis/${diagnosisId}/start/async`,
    data,
  );
};

// * 获取诊断支持信息
export const getDiagnosisSupport = async () => {
  return RequestHttp.instance.get<DiagnosisSupport[]>('/diagnosis/support');
};

// * 获取诊断统计信息
export const getDiagnosisStatistics = async () => {
  return RequestHttp.instance.get<DiagnosisStatistics>('/diagnosis/statistics');
};

// * 获取病害诊断历史
export const getDiagnosisHistory = async () =>
  RequestHttp.instance.get<DiagnosisHistory[]>('/diagnosis/history');

// * 获取病害诊断状态
export const getDiagnosisStatus = async (id: number) =>
  RequestHttp.instance.get<DiagnosisHistory>(`/diagnosis/${id}/status`);

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

// * 获取诊断反馈列表
export const getDiagnosisFeedbackList = async (
  params: ReqPage & {status?: string},
) => {
  return RequestHttp.instance.get<PageData<DiagnosisFeedback>>(
    '/diagnosis/feedback/list',
    params,
  );
};

// * 获取诊断反馈详情
export const getDiagnosisFeedbackDetail = async (id: number | string) => {
  return RequestHttp.instance.get<DiagnosisFeedback>(
    `/diagnosis/feedback/${id}`,
  );
};

// * 创建诊断反馈
export const createDiagnosisFeedback = async (
  diagnosisId: number | string,
  params: ReqCreateDiagnosisFeedback,
) => {
  return RequestHttp.instance.post<DiagnosisFeedback>(
    `/diagnosis/history/${diagnosisId}/feedback`,
    params,
  );
};

// * 更新诊断反馈
export const updateDiagnosisFeedback = async (
  id: number | string,
  params: ReqUpdateDiagnosisFeedback,
) => {
  return RequestHttp.instance.put<DiagnosisFeedback>(
    `/diagnosis/feedback/${id}`,
    params,
  );
};

// * 删除诊断反馈
export const deleteDiagnosisFeedback = async (id: number | string) => {
  return RequestHttp.instance.delete<null>(`/diagnosis/feedback/${id}`);
};

// * 批量删除诊断反馈
export const deleteDiagnosisFeedbacks = async (params: {
  feedbackIds: string;
}) => {
  return RequestHttp.instance.delete<null>(`/diagnosis/feedback`, params);
};
