import {Crop, Disease} from '@/api/interface/knowledge';
import {getCrops} from '@/api/modules/Knowledge/crop';
import {getKnowledgeList} from '@/api/modules/Knowledge/knowledge';
import KnowledgeCard from '@/components/card/KnowledgeCard';
import MainLayout from '@/components/layout/MainLayout';
import {Box} from '@/components/ui/box';
import {Grid, GridItem} from '@/components/ui/grid';
import {Heading} from '@/components/ui/heading';
import {HStack} from '@/components/ui/hstack';
import {ChevronDownIcon} from '@/components/ui/icon';
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from '@/components/ui/select';
import {Text} from '@/components/ui/text';
import {Toast, ToastTitle, useToast} from '@/components/ui/toast';
import {VStack} from '@/components/ui/vstack';
import {EncyclopediaScreenProps} from '@/routes/types';
import {isWeb} from '@gluestack-ui/nativewind-utils/IsWeb';
import {SearchBar} from '@rneui/themed';
import clsx from 'clsx';
import React, {useCallback, useEffect, useState} from 'react';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

const MainContent: React.FC<EncyclopediaScreenProps> = ({navigation}) => {
  const toast = useToast();
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [diseaseList, setDiseaseList] = useState<Disease[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [crops, setCrops] = useState<Crop[]>([]);
  const [selectedCrop, setSelectedCrop] = useState<number | undefined>();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [tempSearchKeyword, setTempSearchKeyword] = useState('');

  const fetchCrops = async () => {
    try {
      const response = await getCrops();
      if (response.data) {
        setCrops(response.data);
      }
    } catch (error) {
      console.error('获取作物列表失败:', error);
    }
  };

  const fetchDiseaseList = async (isLoadMore = false) => {
    try {
      if (!isLoadMore) {
        setIsLoading(true);
      }
      const response = await getKnowledgeList({
        page: isLoadMore ? page + 1 : 1,
        pageSize: 12,
        cropId: selectedCrop,
        keyword: searchKeyword,
      });
      const list = response?.data?.list;
      if (list) {
        if (isLoadMore) {
          setDiseaseList(prev => [...prev, ...list]);
          setPage(prev => prev + 1);
        } else {
          setDiseaseList(list);
          setPage(1);
        }
        setHasMore(list.length === 12);
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
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCrops();
  }, []);

  useEffect(() => {
    fetchDiseaseList();
  }, [selectedCrop, searchKeyword]);

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
    }
  };

  const onEndReached = useCallback(() => {
    if (!isLoading && hasMore) {
      fetchDiseaseList(true);
    }
  }, [isLoading, hasMore]);

  const handleSearch = () => {
    setSearchKeyword(tempSearchKeyword);
  };

  const handleCancel = () => {
    setTempSearchKeyword('');
    setSearchKeyword('');
  };

  const Header: React.FC = () => {
    return (
      <VStack
        space="md"
        className="py-6 px-5 md:px-8 md:pt-9 xl:pt-[90px] lg:pt-[70px] lg:px-[70px] xl:px-[100px] bg-background-100">
        <HStack className="items-center justify-between">
          <VStack space="sm">
            <Box className="text-typography-900 font-bold text-2xl md:text-3xl lg:text-4xl">
              <Heading>病害百科</Heading>
            </Box>
            <Box className="text-typography-600 text-base md:text-lg lg:text-xl">
              <Text>探索各类作物病害知识</Text>
            </Box>
          </VStack>
          <Select
            selectedValue={selectedCrop?.toString()}
            onValueChange={value =>
              setSelectedCrop(value ? Number(value) : undefined)
            }>
            <SelectTrigger variant="outline" size="md">
              <SelectInput placeholder="选择作物" className="h-12" />
              <SelectIcon className="mr-3" as={ChevronDownIcon} />
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                <SelectItem label="全部作物" value="" />
                {crops.map(crop => (
                  <SelectItem
                    key={crop.id}
                    label={crop.name}
                    value={crop.id.toString()}
                  />
                ))}
              </SelectContent>
            </SelectPortal>
          </Select>
        </HStack>
        <View style={styles.searchContainer}>
          <SearchBar
            placeholder="搜索病害名称"
            onChangeText={setTempSearchKeyword}
            value={tempSearchKeyword}
            containerStyle={styles.searchBarContainer}
            inputContainerStyle={styles.searchBarInputContainer}
            onSubmitEditing={handleSearch}
            onCancel={handleCancel}
            showCancel
          />
        </View>
      </VStack>
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
      }
      onScroll={({nativeEvent}) => {
        const {layoutMeasurement, contentOffset, contentSize} = nativeEvent;
        const paddingToBottom = 20;
        if (
          layoutMeasurement.height + contentOffset.y >=
          contentSize.height - paddingToBottom
        ) {
          onEndReached();
        }
      }}
      scrollEventThrottle={400}>
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
        {isLoading && (
          <View className="py-4 items-center">
            <Text>加载中...</Text>
          </View>
        )}
        {!hasMore && diseaseList.length > 0 && (
          <View className="py-4 items-center">
            <Text>没有更多数据了</Text>
          </View>
        )}
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

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
  },
  searchBarContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    padding: 0,
  },
  searchBarInputContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
  },
});

export default EncyclopediaScreen;
