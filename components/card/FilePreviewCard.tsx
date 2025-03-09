import {FileMeta} from '@/api/interface';
import React, {useEffect, useState} from 'react';
import {Avatar, AvatarFallbackText, AvatarImage} from '../ui/avatar';
import {fileDownload} from '@/api/modules';

export type FilePreviewCardProps = {
  file?: FileMeta;
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

const FilePreviewCard: React.FC<FilePreviewCardProps> = ({file}) => {
  const [imageData, setImageData] = useState<string>();

  const fetchImage = async () => {
    try {
      if (!file?.id) return;
      const response = await fileDownload(file.id);
      const base64Data = await blobToBase64(response);
      setImageData(base64Data);
      console.log('base64 url', base64Data);
    } catch (error) {
      console.error('Fetch image error: ', error);
    }
  };

  useEffect(() => {
    fetchImage();
  }, [file]);

  return (
    <Avatar size="lg" className="bg-primary-600">
      <AvatarImage
        alt={file?.originalFileName || 'file Image'}
        style={{width: '100%', height: '100%'}}
        source={{uri: imageData}}
      />
      {!imageData && (
        <AvatarFallbackText>{file?.originalFileName}</AvatarFallbackText>
      )}
    </Avatar>
  );
};

export default FilePreviewCard;
