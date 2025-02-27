import MainLayout from '@/components/layout/MainLayout';
import {Button, ButtonText} from '@/components/ui/button';
import {Heading} from '@/components/ui/heading';
import {Image} from '@/components/ui/image';
import {Text} from '@/components/ui/text';
import {HomeScreenProps} from '@/routes/types';
import React, {useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const MainContent: React.FC<HomeScreenProps> = () => {
  const [imageUri, setImageUri] = useState<string>();
  const [imageType, setImageType] = useState<string>();
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // 打开相机拍照
  const handleTakePhoto = () => {
    launchCamera(
      {
        mediaType: 'photo',
        cameraType: 'back',
        quality: 1,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled camera');
        } else if (response.errorCode) {
          console.log('Camera Error: ', response.errorMessage);
        } else {
          const source = response.assets && response.assets[0].uri;
          const type = response.assets && response.assets[0].type;
          setImageUri(source);
          setImageType(type); // 获取图片类型
        }
      },
    );
  };

  // 从相册选择图片
  const handleChoosePhoto = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else {
          const source = response.assets && response.assets[0].uri;
          const type = response.assets && response.assets[0].type;
          setImageUri(source);
          setImageType(type); // 获取图片类型
        }
      },
    );
  };

  // 上传图片到服务器
  const handleUploadImage = async () => {
    if (!imageUri || !imageType) {
      console.log('No image selected or type not found!');
      return;
    }
    setIsUploading(true);

    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: imageType, // 使用获取到的类型
      name: `disease_image-${Date.now()}.` + imageType.split('/')[1], // 根据类型来确定文件扩展名
    });

    try {
      console.log('Upload successful');
      // 你可以在这里处理服务器返回的结果
    } catch (error) {
      console.log('Upload error: ', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <Heading size="2xl">拍照上传病虫害图片，返回诊断结果</Heading>
      <Button onPress={handleTakePhoto}>
        <ButtonText>拍照</ButtonText>
      </Button>
      <Button onPress={handleChoosePhoto}>
        <ButtonText>从相册选择</ButtonText>
      </Button>
      {imageUri && (
        <>
          <Text>图片已选择:</Text>
          <Image
            source={{uri: imageUri}}
            style={{width: 200, height: 200}}
            alt="选中图片"
          />
          <Button onPress={handleUploadImage} disabled={isUploading}>
            <ButtonText>{isUploading ? '上传中...' : '上传图片'}</ButtonText>
          </Button>
        </>
      )}
    </>
  );
};

const HomeScreen: React.FC<HomeScreenProps> = props => {
  return (
    <MainLayout>
      <MainContent {...props} />
    </MainLayout>
  );
};

export default HomeScreen;
