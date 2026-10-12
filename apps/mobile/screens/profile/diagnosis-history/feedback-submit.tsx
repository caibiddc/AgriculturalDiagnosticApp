import {createDiagnosisFeedback} from '@/api/modules/diagnosis';
import MainLayout from '@/components/layout/MainLayout';
import {Button, ButtonText} from '@/components/ui/button';
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import {HStack} from '@/components/ui/hstack';
import {Icon} from '@/components/ui/icon';
import {Text} from '@/components/ui/text';
import {Textarea, TextareaInput} from '@/components/ui/textarea';
import {Toast, ToastTitle, useToast} from '@/components/ui/toast';
import {VStack} from '@/components/ui/vstack';
import {FeedbackSubmitScreenProps} from '@/routes/types';
import {MessageSquare} from 'lucide-react-native';
import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {Box} from '@/components/ui/box';

const FeedbackSubmitScreen: React.FC<FeedbackSubmitScreenProps> = ({
  route,
  navigation,
}) => {
  const {diagnosisId} = route.params;
  const toast = useToast();
  const [feedbackContent, setFeedbackContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!feedbackContent.trim()) {
      toast.show({
        placement: 'top',
        render: ({id}) => (
          <Toast nativeID={id} variant="solid" action="error">
            <ToastTitle>请输入反馈内容</ToastTitle>
          </Toast>
        ),
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await createDiagnosisFeedback(diagnosisId, {
        feedbackContent: feedbackContent.trim(),
      });

      toast.show({
        placement: 'top',
        render: ({id}) => (
          <Toast nativeID={id} variant="solid" action="success">
            <ToastTitle>提交成功</ToastTitle>
          </Toast>
        ),
      });

      navigation.goBack();
    } catch (error) {
      console.error('提交反馈失败:', error);
      toast.show({
        placement: 'top',
        render: ({id}) => (
          <Toast nativeID={id} variant="solid" action="error">
            <ToastTitle>提交失败，请重试</ToastTitle>
          </Toast>
        ),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 100}}>
        <VStack className="mx-6 mt-6" space="md">
          <VStack space="md" className="bg-background-50 rounded-xl p-4">
            <HStack space="sm" className="items-center">
              <Icon as={MessageSquare} size="md" className="text-primary-500" />
              <Text className="text-typography-900 font-medium text-lg">
                提交反馈
              </Text>
            </HStack>

            <Text className="text-typography-600 text-base">
              如果您对诊断结果有异议，请在此提交反馈。我们的专家会尽快处理您的反馈。
            </Text>

            <FormControl size="md" className="w-full">
              <FormControlLabel>
                <FormControlLabelText>反馈内容</FormControlLabelText>
              </FormControlLabel>
              <Textarea>
                <TextareaInput
                  value={feedbackContent}
                  onChangeText={setFeedbackContent}
                  placeholder="请详细描述您的反馈内容..."
                  autoFocus
                />
              </Textarea>
            </FormControl>
          </VStack>
        </VStack>
      </ScrollView>

      <Box className="absolute bottom-0 left-0 right-0 bg-background-0 p-4">
        <HStack space="sm">
          <Button
            className="flex-1"
            variant="outline"
            action="secondary"
            onPress={() => navigation.goBack()}>
            <ButtonText>取消</ButtonText>
          </Button>
          <Button
            className="flex-1"
            action="primary"
            isDisabled={isSubmitting}
            onPress={handleSubmit}>
            <ButtonText>{isSubmitting ? '提交中...' : '提交反馈'}</ButtonText>
          </Button>
        </HStack>
      </Box>
    </MainLayout>
  );
};

export default FeedbackSubmitScreen;
