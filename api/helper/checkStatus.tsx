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
): void => {
  switch (status) {
    case 400:
      toast.show({
        placement: 'top',
        duration: 3000,
        render: ({id}) => (
          <Toast nativeID={`toast-${id}`} action="muted" variant="solid">
            <ToastTitle>请求失败</ToastTitle>
            <ToastDescription>请您稍后重试</ToastDescription>
          </Toast>
        ),
      });
      break;
    case 401:
      toast.show({
        placement: 'top',
        duration: 3000,
        render: ({id}) => (
          <Toast nativeID={`toast-${id}`} action="muted" variant="solid">
            <ToastTitle>登录失效</ToastTitle>
            <ToastDescription>请您重新登录</ToastDescription>
          </Toast>
        ),
      });
      break;
    case 403:
      toast.show({
        placement: 'top',
        duration: 3000,
        render: ({id}) => (
          <Toast nativeID={`toast-${id}`} action="muted" variant="solid">
            <ToastTitle>无权限访问</ToastTitle>
            <ToastDescription>当前账号无权限访问</ToastDescription>
          </Toast>
        ),
      });
      break;
    case 404:
      toast.show({
        placement: 'top',
        duration: 3000,
        render: ({id}) => (
          <Toast nativeID={`toast-${id}`} action="muted" variant="solid">
            <ToastTitle>资源不存在</ToastTitle>
            <ToastDescription>你所访问的资源不存在</ToastDescription>
          </Toast>
        ),
      });
      break;
    case 405:
      toast.show({
        placement: 'top',
        duration: 3000,
        render: ({id}) => (
          <Toast nativeID={`toast-${id}`} action="muted" variant="solid">
            <ToastTitle>请求方式错误</ToastTitle>
            <ToastDescription>请您稍后重试</ToastDescription>
          </Toast>
        ),
      });
      break;
    case 408:
      toast.show({
        placement: 'top',
        duration: 3000,
        render: ({id}) => (
          <Toast nativeID={`toast-${id}`} action="muted" variant="solid">
            <ToastTitle>请求超时</ToastTitle>
            <ToastDescription>请您稍后重试</ToastDescription>
          </Toast>
        ),
      });
      break;
    case 500:
      toast.show({
        placement: 'top',
        duration: 3000,
        render: ({id}) => (
          <Toast nativeID={`toast-${id}`} action="muted" variant="solid">
            <ToastTitle>服务异常</ToastTitle>
            <ToastDescription>服务暂时不可用</ToastDescription>
          </Toast>
        ),
      });
      break;
    case 502:
      toast.show({
        placement: 'top',
        duration: 3000,
        render: ({id}) => (
          <Toast nativeID={`toast-${id}`} action="muted" variant="solid">
            <ToastTitle>网关错误</ToastTitle>
            <ToastDescription>网关无法响应</ToastDescription>
          </Toast>
        ),
      });
      break;
    case 503:
      toast.show({
        placement: 'top',
        duration: 3000,
        render: ({id}) => (
          <Toast nativeID={`toast-${id}`} action="muted" variant="solid">
            <ToastTitle>服务不可用</ToastTitle>
            <ToastDescription>服务暂时不可用</ToastDescription>
          </Toast>
        ),
      });
      break;
    case 504:
      toast.show({
        placement: 'top',
        duration: 3000,
        render: ({id}) => (
          <Toast nativeID={`toast-${id}`} action="muted" variant="solid">
            <ToastTitle>网关超时</ToastTitle>
            <ToastDescription>网关请求超时</ToastDescription>
          </Toast>
        ),
      });
      break;
    default:
      toast.show({
        placement: 'top',
        duration: 3000,
        render: ({id}) => (
          <Toast nativeID={`toast-${id}`} action="muted" variant="solid">
            <ToastTitle>请求失败</ToastTitle>
            <ToastDescription>请稍后再试</ToastDescription>
          </Toast>
        ),
      });
  }
};
