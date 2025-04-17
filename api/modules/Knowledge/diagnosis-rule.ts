import RequestHttp from '@/api';
import {
  DiagnosisRule,
  ReqDiagnosisRuleList,
} from '@/api/interface/knowledge/diagnosis-rule';

// * 获取诊断规则列表
export const getDiagnosisRules = async () =>
  RequestHttp.instance.get<DiagnosisRule[]>('/knowledge/diagnosis-rule');

// * 创建诊断规则
export const createDiagnosisRule = async (schema: string) =>
  RequestHttp.instance.post<DiagnosisRule>('/knowledge/diagnosis-rule', {
    schema,
  });

// * 更新诊断规则
export const updateDiagnosisRule = async (ruleId: number, schema: string) =>
  RequestHttp.instance.put<DiagnosisRule>(
    `/knowledge/diagnosis-rule/${ruleId}`,
    {schema},
  );

// * 删除诊断规则
export const deleteDiagnosisRule = async (ruleId: number) =>
  RequestHttp.instance.delete<DiagnosisRule>(
    `/knowledge/diagnosis-rule/${ruleId}`,
  );

// * 获取诊断规则详情
export const getDiagnosisRuleDetail = async (ruleId: number) =>
  RequestHttp.instance.get<DiagnosisRule>(
    `/knowledge/diagnosis-rule/${ruleId}`,
  );

// * 获取诊断规则列表
export const getDiagnosisRulesList = async (params: ReqDiagnosisRuleList) =>
  RequestHttp.instance.get<DiagnosisRule[]>(
    '/knowledge/diagnosis-rule/list',
    params,
  );
