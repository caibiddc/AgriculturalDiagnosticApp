import {fileDownload} from '@/api/modules';
import React, {useEffect, useState} from 'react';
import {Image} from '../ui/image';

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
    } catch (error) {
      console.error('Fetch image error: ', error);
    }
  };

  useEffect(() => {
    fetchImage();
  }, [fileId]);

  if (!imageData) return null;
  return (
    <Image
      size="lg"
      source={{uri: imageData}}
      className="rounded-lg bg-background-50"
      alt="诊断图片"
    />
  );
};

export default FilePreviewCard;
