import {ResDiagnosisHistory} from '@/api/interface';
import {getDiagnosisHistoryList} from '@/api/modules/diagnosis';
import React, {useEffect, useState} from 'react';
import {Center} from '../ui/center';
import {Heading} from '../ui/heading';
import {VStack} from '../ui/vstack';
import FilePreviewCard from '../card/FilePreviewCard';
import {HStack} from '../ui/hstack';

const DiagnosisHistoryList: React.FC = () => {
  const [diagnosisList, setDiagnosisList] = useState<ResDiagnosisHistory>([]);

  const fetchDiagnosisHistory = async () => {
    try {
      const response = await getDiagnosisHistoryList({page: 1, pageSize: 5});
      setDiagnosisList(response.data?.list || []);
    } catch (error) {}
  };

  useEffect(() => {
    fetchDiagnosisHistory();
  }, []);

  return (
    <VStack className="mx-6 mt-6" space="md">
      <Heading>诊断历史</Heading>

      <VStack className="w-full">
        {diagnosisList.map((diagnosis, index) => (
          <HStack key={index} className="w-full">
            <FilePreviewCard file={diagnosis?.file} />
            <Center key={index} className="w-full">
              <Heading>{diagnosis?.file?.originalFileName}</Heading>
            </Center>
          </HStack>
        ))}
      </VStack>
    </VStack>
  );
};

export default DiagnosisHistoryList;
