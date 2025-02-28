import {Alert, ToastAndroid} from 'react-native';

/**
 * @description: 校验网络请求状态码
 * @param {Number} status
 * @return void
 */
export const checkStatus = (status: number): void => {
  switch (status) {
    case 400:
      ToastAndroid.show('请求失败！请您稍后重试', ToastAndroid.SHORT);
      break;
    case 401:
      ToastAndroid.show('登录失效！请您重新登录', ToastAndroid.SHORT);
      break;
    case 403:
      ToastAndroid.show('当前账号无权限访问！', ToastAndroid.SHORT);
      break;
    case 404:
      ToastAndroid.show('你所访问的资源不存在！', ToastAndroid.SHORT);
      break;
    case 405:
      ToastAndroid.show('请求方式错误！请您稍后重试', ToastAndroid.SHORT);
      break;
    case 408:
      ToastAndroid.show('请求超时！请您稍后重试', ToastAndroid.SHORT);
      break;
    case 500:
      ToastAndroid.show('服务异常！', ToastAndroid.SHORT);
      break;
    case 502:
      ToastAndroid.show('网关错误！', ToastAndroid.SHORT);
      break;
    case 503:
      ToastAndroid.show('服务不可用！', ToastAndroid.SHORT);
      break;
    case 504:
      ToastAndroid.show('网关超时！', ToastAndroid.SHORT);
      break;
    default:
      ToastAndroid.show('请求失败！', ToastAndroid.SHORT);
  }
};
