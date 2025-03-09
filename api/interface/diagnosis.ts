import {FileMeta, PageData} from '.';

export interface DiagnosisHistory {
  id: number; // 主键ID
  file: FileMeta; // 文件ID
  diagnosisResult: object | null;
  status: string; // 状态（默认值为 'pending'）
  createdBy: number; // 创建者
  updatedBy: number; // 更新者
  createdAt: string; // 创建时间
  updatedAt: string; // 更新时间
}

export interface ReqDiagnoseDisease {
  fileId: string;
}

export type ResDiagnosisHistory = DiagnosisHistory[];

export type ReqDiagnosisHistoryList = {
  page: number;
  pageSize: number;
};

export type ResDiagnosisHistoryList = PageData<DiagnosisHistory>;
