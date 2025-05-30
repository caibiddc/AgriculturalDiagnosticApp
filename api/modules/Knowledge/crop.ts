import RequestHttp from '@/api';
import {
  Crop,
  ReqCreateCrop,
  ReqCropList,
  ReqUpdateCrop,
  ResCropDetail,
  ResCropList,
} from '@/api/interface/knowledge';

// * 获取全部作物
export const getCrops = async () =>
  RequestHttp.instance.get<Crop[]>('/knowledge/crop');

// * 获取作物列表
export const getCropsList = async (params: ReqCropList) =>
  RequestHttp.instance.get<ResCropList>('/knowledge/crop/list', params);

// * 获取作物详情
export const getCropDetail = async (cropId: number) =>
  RequestHttp.instance.get<ResCropDetail>(`/knowledge/crop/${cropId}`);

// * 创建作物
export const createCrop = (params: ReqCreateCrop) =>
  RequestHttp.instance.post<null>('/knowledge/crop', params);

// * 修改作物
export const updateCrop = (cropId: number, params: ReqUpdateCrop) =>
  RequestHttp.instance.patch(`/knowledge/crop/${cropId}`, params);

// * 删除作物
export const deleteCrop = (cropId: number) =>
  RequestHttp.instance.delete(`/knowledge/crop/${cropId}`);
