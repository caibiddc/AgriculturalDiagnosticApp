import KnowledgeCard from '@/components/card/KnowledgeCard';
import EncyclopediaFilter from '@/components/filter/EncyclopediaFilter';
import MainLayout from '@/components/layout/MainLayout';
import {Box} from '@/components/ui/box';
import {Grid, GridItem} from '@/components/ui/grid';
import {Heading} from '@/components/ui/heading';
import {HStack} from '@/components/ui/hstack';
import {Text} from '@/components/ui/text';
import {Toast, ToastTitle, useToast} from '@/components/ui/toast';
import {VStack} from '@/components/ui/vstack';
import {getKnowledgeList} from '@/api/modules/Knowledge/knowledge';
import {Disease} from '@/api/interface/knowledge';
import {EncyclopediaScreenProps} from '@/routes/types';
import {isWeb} from '@gluestack-ui/nativewind-utils/IsWeb';
import clsx from 'clsx';
import React, {useEffect, useState} from 'react';
import {RefreshControl, SafeAreaView, ScrollView} from 'react-native';

const MainContent: React.FC<EncyclopediaScreenProps> = ({navigation}) => {
  const toast = useToast();
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [diseaseList, setDiseaseList] = useState<Disease[]>([]);

  const fetchDiseaseList = async () => {
    try {
      setIsLoading(true);
      const response = await getKnowledgeList({page: 1, pageSize: 12});
      if (response.data?.list) {
        setDiseaseList(response.data.list);
      }
    } catch (error) {
      console.error('获取病害知识失败:', error);
      toast.show({
        placement: 'top right',
        render: ({id}) => (
          <Toast nativeID={id} variant="solid" action="error">
            <ToastTitle>获取病害知识失败</ToastTitle>
          </Toast>
        ),
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDiseaseList();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchDiseaseList();
      toast.show({
        placement: 'top right',
        render: ({id}) => (
          <Toast nativeID={id} variant="solid" action="success">
            <ToastTitle>更新成功</ToastTitle>
          </Toast>
        ),
      });
    } catch (error) {
      console.error('刷新失败:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const Header: React.FC = () => {
    return (
      <HStack className="py-6 px-5 items-center justify-between md:px-8 md:pt-9 xl:pt-[90px] lg:pt-[70px] lg:px-[70px] xl:px-[100px] bg-background-100">
        <VStack space="sm">
          <Box className="text-typography-900 font-bold text-2xl md:text-3xl lg:text-4xl">
            <Heading>病害百科</Heading>
          </Box>
          <Box className="text-typography-600 text-base md:text-lg lg:text-xl">
            <Text>探索各类作物病害知识</Text>
          </Box>
        </VStack>
      </HStack>
    );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: isWeb ? 0 : 160,
        flexGrow: 1,
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Box className="bg-background-50">
        <Header />
      </Box>
      <Box className="bg-background-0">
        <Grid
          className={clsx(
            'gap-x-3 gap-y-4 md:gap-x-4 lg:gap-x-7 lg:gap-y-8',
            'py-6 px-5 md:px-8 md:pt-9 xl:pt-[90px] lg:pt-[70px]',
            'lg:px-[70px] xl:px-[100px] max-w-[1730px] mx-auto',
          )}
          _extra={{
            className: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
          }}>
          {diseaseList.map((disease, index) => (
            <GridItem key={disease.id} _extra={{className: 'col-span-1'}}>
              <KnowledgeCard
                knowledge={{
                  title: disease.name,
                  url: disease.crop?.imageUrl,
                  description: disease.cause,
                }}
                onPress={() => {
                  navigation.navigate('DiseaseDetail', {
                    diseaseId: disease.id,
                  });
                }}
              />
            </GridItem>
          ))}
        </Grid>
      </Box>
    </ScrollView>
  );
};

const EncyclopediaScreen: React.FC<EncyclopediaScreenProps> = props => {
  return (
    <SafeAreaView>
      <MainLayout>
        <MainContent {...props} />
      </MainLayout>
    </SafeAreaView>
  );
};

export default EncyclopediaScreen;
