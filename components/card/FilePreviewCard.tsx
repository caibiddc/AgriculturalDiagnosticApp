import {fileDownload} from '@/api/modules';
import React, {useEffect, useState} from 'react';
import {Avatar, AvatarImage} from '../ui/avatar';

export type FilePreviewCardProps = {
  fileId?: number;
};

const blobToBase64 = (blob: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.readAsDataURL(blob);
  });

const FilePreviewCard: React.FC<FilePreviewCardProps> = ({fileId}) => {
  const [imageData, setImageData] = useState<string>();

  const fetchImage = async () => {
    try {
      if (!fileId) return;
      const response = await fileDownload(fileId);
      const base64Data = await blobToBase64(response);
      setImageData(base64Data);
      console.log('base64 url', base64Data);
    } catch (error) {
      console.error('Fetch image error: ', error);
    }
  };

  useEffect(() => {
    fetchImage();
  }, [fileId]);

  return (
    <Avatar size="lg" className="bg-primary-600">
      <AvatarImage
        style={{width: '100%', height: '100%'}}
        source={{uri: imageData}}
      />
    </Avatar>
  );
};

export default FilePreviewCard;
