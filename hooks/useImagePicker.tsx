import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from '@/components/ui/toast';
import {useCallback, useState} from 'react';
import {Image} from 'react-native-compressor';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

// 定义返回的图片类型
export interface ImagePickerResult {
  uri: string;
  type: string;
  name: string;
}

// 设置默认配置
const defaultOptions = {
  mediaType: 'photo', // 确保选择的是图片
  quality: 0.7, // 图片质量，先进行初步压缩
} as const;

const useImagePicker = () => {
  const toast = useToast();
  const [image, setImage] = useState<ImagePickerResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const errorHandler = (response: ImagePickerResponse) => {
    switch (response.errorCode) {
      case 'camera_unavailable':
        toast.show({
          placement: 'top',
          duration: 3000,
          render: ({id}) => (
            <Toast nativeID={`toast-${id}`} action="error" variant="solid">
              <ToastTitle>相机被占用</ToastTitle>
              <ToastDescription>{response.errorMessage}</ToastDescription>
            </Toast>
          ),
        });
        break;
      case 'permission':
        toast.show({
          placement: 'top',
          duration: 3000,
          render: ({id}) => (
            <Toast nativeID={`toast-${id}`} action="error" variant="solid">
              <ToastTitle>无相机权限</ToastTitle>
              <ToastDescription>{response.errorMessage}</ToastDescription>
            </Toast>
          ),
        });
        break;
      case 'others':
        toast.show({
          placement: 'top',
          duration: 3000,
          render: ({id}) => (
            <Toast nativeID={`toast-${id}`} action="error" variant="solid">
              <ToastDescription>
                请检查相机是否被占用？或是否给予了相机权限
              </ToastDescription>
            </Toast>
          ),
        });
        break;
      default:
        break;
    }
  };

  const handleImageResponse = async (response: ImagePickerResponse) => {
    if (response.didCancel) {
      setError('User cancelled the image picker');
      return null;
    } else if (response.errorCode) {
      errorHandler(response);
      setError(`ImagePicker Error: ${response.errorMessage}`);
      return null;
    } else if (response.assets && response.assets[0]) {
      const {uri, type, fileName} = response.assets[0];
      if (!uri || !type) {
        setError('No image selected or type not found!');
        return null;
      }

      try {
        // 压缩图片，最大尺寸为 1MB
        const compressedUri = await Image.compress(uri, {
          maxWidth: 640,
          maxHeight: 640,
          quality: 0.8,
        });

        return {
          uri: compressedUri,
          type,
          name: fileName ?? `disease-${Date.now()}.jpg`,
        };
      } catch (error) {
        setError('图片压缩失败');
        return null;
      }
    }
    return null;
  };

  // 封装拍照功能
  const takePhoto = useCallback(() => {
    setLoading(true);
    setError(null);

    launchCamera(defaultOptions, async (response: ImagePickerResponse) => {
      const compressedImage = await handleImageResponse(response);
      if (compressedImage) {
        setImage(compressedImage);
      }
      setLoading(false);
    });
  }, []);

  // 封装选择图片功能
  const choosePhoto = useCallback(() => {
    setLoading(true);
    setError(null);

    launchImageLibrary(
      defaultOptions,
      async (response: ImagePickerResponse) => {
        const compressedImage = await handleImageResponse(response);
        if (compressedImage) {
          setImage(compressedImage);
        }
        setLoading(false);
      },
    );
  }, []);

  // 清除图片
  const clearImage = useCallback(() => {
    setImage(null);
  }, []);

  return {
    image,
    loading,
    error,
    takePhoto,
    choosePhoto,
    clearImage,
  };
};

export default useImagePicker;
