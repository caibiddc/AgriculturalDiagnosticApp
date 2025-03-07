import RequestHttp from '@/api';
import {ImagePickerResult} from '@/hooks/useImagePicker';

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

// * 获取病害诊断历史
export const getDiagnosisHistory = async () =>
  RequestHttp.instance.get<any>('/diagnosis/history');
