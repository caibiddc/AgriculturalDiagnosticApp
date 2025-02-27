import RequestHttp from '@/api';

// * 病害数据诊断
export const diagnoseDisease = async (fileId: string) =>
  RequestHttp.instance.get<any>(`/diagnosis/${fileId}`);
