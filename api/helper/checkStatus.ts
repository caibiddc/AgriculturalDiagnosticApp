import {Alert} from 'react-native';

/**
 * @description: 校验网络请求状态码
 * @param {Number} status
 * @return void
 */
export const checkStatus = (status: number): void => {
  switch (status) {
    case 400:
      Alert.alert('请求失败！请您稍后重试');
      break;
    case 401:
      Alert.alert('登录失效！请您重新登录');
      break;
    case 403:
      Alert.alert('当前账号无权限访问！');
      break;
    case 404:
      Alert.alert('你所访问的资源不存在！');
      break;
    case 405:
      Alert.alert('请求方式错误！请您稍后重试');
      break;
    case 408:
      Alert.alert('请求超时！请您稍后重试');
      break;
    case 500:
      Alert.alert('服务异常！');
      break;
    case 502:
      Alert.alert('网关错误！');
      break;
    case 503:
      Alert.alert('服务不可用！');
      break;
    case 504:
      Alert.alert('网关超时！');
      break;
    default:
      Alert.alert('请求失败！');
  }
};
