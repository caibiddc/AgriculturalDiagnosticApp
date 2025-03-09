import {DiagnosisHistory, ResDiagnosisHistory} from '@/api/interface';
import {getDiagnosisHistoryList} from '@/api/modules/diagnosis';
import React, {useEffect, useState} from 'react';
import FilePreviewCard from '../card/FilePreviewCard';
import {Heading} from '../ui/heading';
import {HStack} from '../ui/hstack';
import {Text} from '../ui/text';
import {VStack} from '../ui/vstack';

export type DiagnosisHistoryListProps = {
  diagnosisList?: DiagnosisHistory[];
};

const DiagnosisHistoryList: React.FC<DiagnosisHistoryListProps> = ({
  diagnosisList = [],
}) => {
  return (
    <VStack className="mx-6 mt-6" space="md">
      <Heading>诊断历史</Heading>
      <VStack className="w-full" space="md">
        {diagnosisList.map(diagnosis => (
          <HStack className="w-full" space="md">
            <FilePreviewCard file={diagnosis?.file} />
            <VStack>
              <Text>{diagnosis?.status}</Text>
              <Text>{diagnosis?.file?.originalFileName}</Text>
              <Text>{diagnosis?.createdAt}</Text>
            </VStack>
          </HStack>
        ))}
      </VStack>
    </VStack>
  );
};

export default DiagnosisHistoryList;
