import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from '@/components/ui/toast';

/**
 * @description: 校验网络请求状态码
 * @param {Number} status
 * @return void
 */
export const checkStatus = (
  status: number,
  toast: ReturnType<typeof useToast>,
  message?: string,
): void => {
  switch (status) {
    case 400:
      toast.show({
        placement: 'top',
        duration: 3000,
        render: ({id}) => (
          <Toast nativeID={`toast-${id}`} action="error" variant="solid">
            <ToastTitle>请求失败</ToastTitle>
            <ToastDescription>
              {message ?? '请求失败！请您稍后重试'}
            </ToastDescription>
          </Toast>
        ),
      });
      break;
    case 401:
      toast.show({
        placement: 'top',
        duration: 3000,
        render: ({id}) => (
          <Toast nativeID={`toast-${id}`} action="error" variant="solid">
            <ToastTitle>登录失效</ToastTitle>
            <ToastDescription>
              {message ?? '登录失效！请您重新登录'}
            </ToastDescription>
          </Toast>
        ),
      });
      break;
    case 403:
      toast.show({
        placement: 'top',
        duration: 3000,
        render: ({id}) => (
          <Toast nativeID={`toast-${id}`} action="error" variant="solid">
            <ToastTitle>无权限访问</ToastTitle>
            <ToastDescription>
              {message ?? '当前账号无权限访问！'}
            </ToastDescription>
          </Toast>
        ),
      });
      break;
    case 404:
      toast.show({
        placement: 'top',
        duration: 3000,
        render: ({id}) => (
          <Toast nativeID={`toast-${id}`} action="error" variant="solid">
            <ToastTitle>资源不存在</ToastTitle>
            <ToastDescription>
              {message ?? '你所访问的资源不存在！'}
            </ToastDescription>
          </Toast>
        ),
      });
      break;
    case 405:
      toast.show({
        placement: 'top',
        duration: 3000,
        render: ({id}) => (
          <Toast nativeID={`toast-${id}`} action="error" variant="solid">
            <ToastTitle>请求方式错误</ToastTitle>
            <ToastDescription>
              {message ?? '请求方式错误！请您稍后重试'}
            </ToastDescription>
          </Toast>
        ),
      });
      break;
    case 408:
      toast.show({
        placement: 'top',
        duration: 3000,
        render: ({id}) => (
          <Toast nativeID={`toast-${id}`} action="error" variant="solid">
            <ToastTitle>请求超时</ToastTitle>
            <ToastDescription>
              {message ?? '请求超时！请您稍后重试'}
            </ToastDescription>
          </Toast>
        ),
      });
      break;
    case 500:
      toast.show({
        placement: 'top',
        duration: 3000,
        render: ({id}) => (
          <Toast nativeID={`toast-${id}`} action="error" variant="solid">
            <ToastTitle>服务异常</ToastTitle>
            <ToastDescription>{message ?? '服务暂不可用'}</ToastDescription>
          </Toast>
        ),
      });
      break;
    case 502:
      toast.show({
        placement: 'top',
        duration: 3000,
        render: ({id}) => (
          <Toast nativeID={`toast-${id}`} action="error" variant="solid">
            <ToastTitle>网关错误</ToastTitle>
            <ToastDescription>{message ?? '网关无法响应！'}</ToastDescription>
          </Toast>
        ),
      });
      break;
    case 503:
      toast.show({
        placement: 'top',
        duration: 3000,
        render: ({id}) => (
          <Toast nativeID={`toast-${id}`} action="error" variant="solid">
            <ToastTitle>服务不可用</ToastTitle>
            <ToastDescription>{message ?? '服务不可用！'}</ToastDescription>
          </Toast>
        ),
      });
      break;
    case 504:
      toast.show({
        placement: 'top',
        duration: 3000,
        render: ({id}) => (
          <Toast nativeID={`toast-${id}`} action="error" variant="solid">
            <ToastTitle>网关超时</ToastTitle>
            <ToastDescription>{message ?? '网关超时！'}</ToastDescription>
          </Toast>
        ),
      });
      break;
    default:
      toast.show({
        placement: 'top',
        duration: 3000,
        render: ({id}) => (
          <Toast nativeID={`toast-${id}`} action="error" variant="solid">
            <ToastTitle>请求失败</ToastTitle>
            <ToastDescription>{message ?? '请求失败！'}</ToastDescription>
          </Toast>
        ),
      });
  }
};
