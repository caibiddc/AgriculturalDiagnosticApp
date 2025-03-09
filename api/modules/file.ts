import RequestHttp from '@/api';

export const fileDownload = (fileId: number) => {
  return RequestHttp.instance.get(
    `/file/download/${fileId}`,
    {},
    {responseType: 'blob'},
  ) as unknown as Promise<Blob>;
};
