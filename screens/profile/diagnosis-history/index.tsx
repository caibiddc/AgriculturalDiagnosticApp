// DiagnosisHistoryScreen.tsx
import {DiagnosisHistory} from '@/api/interface/diagnosis';
import {getDiagnosisHistoryList} from '@/api/modules/diagnosis';
import MainLayout from '@/components/layout/MainLayout';
import {Divider} from '@/components/ui/divider';
import {Heading} from '@/components/ui/heading';
import {HStack} from '@/components/ui/hstack';
import {Icon} from '@/components/ui/icon';
import {Pressable} from '@/components/ui/pressable';
import {Text} from '@/components/ui/text';
import {Toast, ToastTitle, useToast} from '@/components/ui/toast';
import {VStack} from '@/components/ui/vstack';
import {DiagnosisHistoryProps} from '@/routes/types';
import {isWeb} from '@gluestack-ui/nativewind-utils/IsWeb';
import clsx from 'clsx';
import {Calendar, Clock, Crop, Info} from 'lucide-react-native';
import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl} from 'react-native';

const DiagnosisHistoryScreen: React.FC<DiagnosisHistoryProps> = ({
  navigation,
}) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [diagnosisList, setDiagnosisList] = useState<DiagnosisHistory[]>([]);

  const fetchDiagnosisHistory = async () => {
    try {
      const response = await getDiagnosisHistoryList({page: 1, pageSize: 10});
      setDiagnosisList(response.data?.list || []);
    } catch (error) {
      console.error('获取诊断历史失败:', error);
      toast.show({
        placement: 'top right',
        render: ({id}) => (
          <Toast nativeID={id} variant="solid" action="error">
            <ToastTitle>获取诊断历史失败</ToastTitle>
          </Toast>
        ),
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDiagnosisHistory();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDiagnosisHistory();
    setRefreshing(false);
  };

  const renderItem = ({item: diagnosis}: {item: DiagnosisHistory}) => (
    <>
      <Pressable
        key={diagnosis.id}
        onPress={() =>
          navigation.navigate('DiagnosisDetail', {
            diagnosisId: diagnosis.id,
          })
        }
        className={clsx(
          'bg-background-50 rounded-xl p-4',
          'active:bg-background-100',
        )}>
        <VStack space="sm">
          <HStack space="sm" className="items-center">
            <Icon as={Crop} size="md" className="text-primary-500" />
            <Text className="text-typography-900 font-medium">
              {diagnosis.diagnosisResult?.predictions?.[0]?.class_name ||
                '未知病害'}
            </Text>
          </HStack>
          <HStack space="sm" className="items-center">
            <Icon as={Calendar} size="sm" className="text-typography-500" />
            <Text className="text-typography-500 text-sm">
              {new Date(diagnosis.createdAt).toLocaleDateString()}
            </Text>
            <Icon as={Clock} size="sm" className="text-typography-500 ml-2" />
            <Text className="text-typography-500 text-sm">
              {new Date(diagnosis.createdAt).toLocaleTimeString()}
            </Text>
          </HStack>
          <HStack space="sm" className="items-center">
            <Icon as={Info} size="sm" className="text-typography-500" />
            <Text className="text-typography-500 text-sm">
              置信度:{' '}
              {(
                (diagnosis.diagnosisResult?.predictions?.[0]?.confidence || 0) *
                100
              ).toFixed(2)}
              %
            </Text>
          </HStack>
        </VStack>
      </Pressable>
      <Divider />
    </>
  );

  return (
    <MainLayout>
      <FlatList
        data={diagnosisList}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: isWeb ? 0 : 160,
        }}
        ListHeaderComponent={
          <Heading size="xl" className="text-typography-900 mb-4">
            诊断历史
          </Heading>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={5}
        removeClippedSubviews={true}
      />
    </MainLayout>
  );
};

export default DiagnosisHistoryScreen;
