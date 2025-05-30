import {DiagnosisHistory} from '@/api/interface/diagnosis';
import {
  deleteDiagnosisHistories,
  deleteDiagnosisHistory,
  getDiagnosisHistoryList,
} from '@/api/modules/diagnosis';
import MainLayout from '@/components/layout/MainLayout';
import {Button, ButtonText} from '@/components/ui/button';
import {Heading} from '@/components/ui/heading';
import {HStack} from '@/components/ui/hstack';
import {Icon} from '@/components/ui/icon';
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@/components/ui/modal';
import {Pressable} from '@/components/ui/pressable';
import {Text} from '@/components/ui/text';
import {Toast, ToastTitle, useToast} from '@/components/ui/toast';
import {VStack} from '@/components/ui/vstack';
import {DIAGNOSIS_CLASS_NAME_ZH_CN} from '@/constants/diagnosis';
import {DiagnosisHistoryProps} from '@/routes/types';
import {isWeb} from '@gluestack-ui/nativewind-utils/IsWeb';
import {ListItem} from '@rneui/themed';
import clsx from 'clsx';
import {
  Calendar,
  Check,
  Clock,
  Crop,
  Info,
  Trash2,
  X,
} from 'lucide-react-native';
import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl, StyleSheet} from 'react-native';

const DiagnosisHistoryScreen: React.FC<DiagnosisHistoryProps> = ({
  navigation,
}) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [diagnosisList, setDiagnosisList] = useState<DiagnosisHistory[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showBatchDeleteModal, setShowBatchDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

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

  const handlePress = (id: number) => {
    if (isSelectMode) {
      setSelectedIds(prev => {
        if (prev.includes(id)) {
          return prev.filter(item => item !== id);
        } else {
          return [...prev, id];
        }
      });
    } else {
      navigation.navigate('DiagnosisDetail', {
        diagnosisId: id,
      });
    }
  };

  const toggleSelectMode = () => {
    setIsSelectMode(!isSelectMode);
    if (!isSelectMode) {
      setSelectedIds([]);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteDiagnosisHistory(id);
      setDiagnosisList(prev => prev.filter(item => item.id !== id));
      setShowDeleteModal(false);
      toast.show({
        placement: 'top',
        render: ({id}) => (
          <Toast nativeID={id} variant="solid" action="success">
            <ToastTitle>删除成功</ToastTitle>
          </Toast>
        ),
      });
    } catch (error) {
      console.error('删除失败:', error);
      toast.show({
        placement: 'top',
        render: ({id}) => (
          <Toast nativeID={id} variant="solid" action="error">
            <ToastTitle>删除失败</ToastTitle>
          </Toast>
        ),
      });
    }
  };

  const handleBatchDelete = async () => {
    if (selectedIds.length === 0) return;

    try {
      await deleteDiagnosisHistories({
        diagnosisIds: selectedIds.join(','),
      });
      setDiagnosisList(prev =>
        prev.filter(item => !selectedIds.includes(item.id)),
      );
      setSelectedIds([]);
      setIsSelectMode(false);
      setShowBatchDeleteModal(false);
      toast.show({
        placement: 'top',
        render: ({id}) => (
          <Toast nativeID={id} variant="solid" action="success">
            <ToastTitle>批量删除成功</ToastTitle>
          </Toast>
        ),
      });
    } catch (error) {
      console.error('批量删除失败:', error);
      toast.show({
        placement: 'top',
        render: ({id}) => (
          <Toast nativeID={id} variant="solid" action="error">
            <ToastTitle>批量删除失败</ToastTitle>
          </Toast>
        ),
      });
    }
  };

  const renderItem = ({item: diagnosis}: {item: DiagnosisHistory}) => (
    <ListItem.Swipeable
      key={diagnosis.id}
      onPress={() => handlePress(diagnosis.id)}
      rightWidth={80}
      rightStyle={styles.rightContainer}
      rightContent={reset => (
        <Pressable
          onPress={() => {
            setSelectedId(diagnosis.id);
            setShowDeleteModal(true);
            reset();
          }}
          style={styles.deleteButton}>
          <Icon as={Trash2} size="md" className="text-white" />
        </Pressable>
      )}
      containerStyle={[
        styles.container,
        isSelectMode && selectedIds.includes(diagnosis.id) && styles.selected,
      ]}>
      <VStack space="sm" className="flex-1">
        <HStack space="sm" className="items-center">
          {isSelectMode && (
            <Icon
              as={Check}
              size="md"
              className={clsx(
                'mr-2',
                selectedIds.includes(diagnosis.id)
                  ? 'text-primary-500'
                  : 'text-typography-300',
              )}
            />
          )}
          <Icon as={Crop} size="md" className="text-primary-500" />
          <Text className="text-typography-900 font-medium">
            {DIAGNOSIS_CLASS_NAME_ZH_CN[
              diagnosis.diagnosisResult?.predictions?.[0]
                ?.class_name as keyof typeof DIAGNOSIS_CLASS_NAME_ZH_CN
            ] || '未知病害'}
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
    </ListItem.Swipeable>
  );

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#F8FAFC',
      borderRadius: 12,
      padding: 16,
      marginBottom: 8,
      overflow: 'hidden',
    },
    selected: {
      backgroundColor: '#EFF6FF',
    },
    rightContainer: {
      borderRadius: 12,
      overflow: 'hidden',
      marginBottom: 8,
    },
    deleteButton: {
      backgroundColor: '#EF4444',
      padding: 16,
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
    },
  });

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
          <VStack space="md" className="mb-4">
            <HStack className="justify-between items-center">
              <Heading size="xl" className="text-typography-900">
                诊断历史
              </Heading>
              <Button
                onPress={toggleSelectMode}
                variant={isSelectMode ? 'solid' : 'outline'}
                action={isSelectMode ? 'primary' : 'secondary'}>
                <ButtonText>{isSelectMode ? '取消' : '批量删除'}</ButtonText>
              </Button>
            </HStack>
            {isSelectMode && (
              <HStack className="justify-between items-center">
                <Text className="text-typography-500">
                  已选择 {selectedIds.length} 项
                </Text>
                {selectedIds.length > 0 && (
                  <Button
                    onPress={() => setShowBatchDeleteModal(true)}
                    action="negative">
                    <ButtonText>删除选中</ButtonText>
                  </Button>
                )}
              </HStack>
            )}
          </VStack>
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

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        size="md">
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="md" className="text-typography-950">
              确认删除
            </Heading>
            <ModalCloseButton>
              <Icon
                as={X}
                size="md"
                className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
              />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Text size="sm" className="text-typography-500">
              确定要删除这条诊断记录吗？删除后无法恢复。
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              onPress={() => setShowDeleteModal(false)}
              variant="outline"
              action="secondary"
              className="mr-2">
              <ButtonText>取消</ButtonText>
            </Button>
            <Button
              onPress={() => selectedId && handleDelete(selectedId)}
              action="negative">
              <ButtonText>删除</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={showBatchDeleteModal}
        onClose={() => setShowBatchDeleteModal(false)}
        size="md">
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="md" className="text-typography-950">
              确认删除
            </Heading>
            <ModalCloseButton>
              <Icon
                as={X}
                size="md"
                className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
              />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Text size="sm" className="text-typography-500">
              确定要删除选中的 {selectedIds.length}{' '}
              条诊断记录吗？删除后无法恢复。
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              onPress={() => setShowBatchDeleteModal(false)}
              variant="outline"
              action="secondary"
              className="mr-2">
              <ButtonText>取消</ButtonText>
            </Button>
            <Button onPress={handleBatchDelete} action="negative">
              <ButtonText>删除</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </MainLayout>
  );
};

export default DiagnosisHistoryScreen;
