import KnowledgeCard from '@/components/card/KnowledgeCard';
import MainLayout from '@/components/layout/MainLayout';
import {Box} from '@/components/ui/box';
import {Grid, GridItem} from '@/components/ui/grid';
import {Heading} from '@/components/ui/heading';
import {HStack} from '@/components/ui/hstack';
import {Text} from '@/components/ui/text';
import {VStack} from '@/components/ui/vstack';
import {EncyclopediaScreenProps} from '@/routes/types';
import {isWeb} from '@gluestack-ui/nativewind-utils/IsWeb';
import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';

const knowledgeList = [
  {
    title: 'Getting Started',
    url: 'https://res.cloudinary.com/dk5bvgq20/image/upload/v1635707417/Getting_Started',
  },
];

const Header: React.FC = () => {
  return (
    <HStack className="py-6 px-5 md:px-8 md:pt-9 xl:pt-[90px] lg:pt-[70px] lg:px-[70px] xl:px-[100px] bg-background-100">
      <VStack>
        <Box className="text-typography-900 font-bold text-2xl md:text-3xl lg:text-4xl">
          <Heading>病害百科</Heading>
        </Box>
        <Box className="text-typography-600 text-base md:text-lg lg:text-xl">
          <Text>这里列举了一些常见的病害</Text>
        </Box>
      </VStack>
    </HStack>
  );
};

const MainContent: React.FC<EncyclopediaScreenProps> = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: isWeb ? 0 : 160,
        flexGrow: 1,
      }}>
      <Box className="bg-background-50">
        <Header />
      </Box>
      <Box className="bg-background-0">
        <Grid
          className="gap-x-3 gap-y-4 md:gap-x-4 lg:gap-x-7 lg:gap-y-8 py-6 px-5 md:px-8 md:pt-9 xl:pt-[90px] lg:pt-[70px] lg:px-[70px] xl:px-[100px] max-w-[1730px] mx-auto"
          _extra={{
            className: 'grid-cols-2 md:grid-cols-3',
          }}>
          {knowledgeList.map((knowledge, index) => (
            <GridItem key={index} _extra={{className: 'col-span-1'}}>
              <KnowledgeCard knowledge={knowledge} onPress={() => {}} />
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
