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
  pending: 'bg-secondary-500',
  in_progress: 'bg-warning-500 text-white',
  completed: 'bg-success-500 text-white',
} as const;
