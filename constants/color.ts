import {DIAGNOSIS_STATUS} from './status';

export const ROLE_COLOR = {
  专家: 'blue',
  农民: 'green',
  管理员: 'orange',
} as const;

export const FILE_TYPE_COLOR = {
  Image: 'green',
  Audio: 'blue',
  Video: 'orange',
  Application: 'purple',
  other: 'default',
} as const;

export const DIAGNOSIS_STATUS_COLOR = {
  [DIAGNOSIS_STATUS.PENDING]: 'bg-secondary-500',
  [DIAGNOSIS_STATUS.PROCESSING]: 'bg-warning-500 text-white',
  [DIAGNOSIS_STATUS.SUCCESS]: 'bg-success-500 text-white',
  [DIAGNOSIS_STATUS.FAILED]: 'bg-error-500 text-white',
} as const;
