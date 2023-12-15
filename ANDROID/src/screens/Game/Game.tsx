import {
  Box,
  Button,
  ButtonText,
  Text,
  View,
  Progress,
  ProgressFilledTrack,
} from '@gluestack-ui/themed';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import useGame from './hooks/useGame';
import Avatar from '../../components/Avatar/Avatar';

export default function Game({route}: {route: any}) {
  const currentQuestion = route.params.currentQuestion;
  const {
    question,
    answers,
    roomData,
    type,
    users,
    user,
    getButtonColor,
    selectedAnswer,
    setSelectedAnswer,
    questionProgress,
  } = useGame({
    currentQuestion,
  });
  return (
    <View
      flex={1}
      bg="$backgroundDark950"
      justifyContent="center"
      alignItems="center">
      <Box bg="$backgroundDark600" w="$5/6" rounded="$md" p="$4">
        <Box
          bg="$blue700"
          p="$2"
          flexDirection="row"
          alignItems="center"
          alignSelf="flex-end"
          justifyContent="center"
          gap="$4"
          rounded="$lg">
          <FAIcon name="trophy" color="white" size={16} />
          <Text color="$white" fontWeight="$bold" fontSize="$lg">
            {user?.points}
          </Text>
        </Box>
        <Text
          my="$8"
          textAlign="center"
          fontSize="$xl"
          lineHeight="$xl"
          color="$textLight0"
          fontWeight="$black">
          {type === 'PLAYING' ? 'choose your answer' : 'please wait'}
        </Text>
        <Text
          textAlign="center"
          fontSize="$5xl"
          lineHeight="$5xl"
          color="$textLight0"
          fontWeight="$black">
          {roomData.countdown}
        </Text>
        <Box alignItems="center" gap="$4">
          <Progress size="xs" w={250} value={questionProgress}>
            <ProgressFilledTrack />
          </Progress>
        </Box>
        <Box>
          <Text
            textAlign="center"
            color="$white"
            fontWeight="$medium"
            fontSize="$sm"
            my="$2">
            {question?.question}
          </Text>
        </Box>
        <Box my="$8" gap="$4">
          {answers?.map((answer: string, index: number) => {
            return (
              <Button
                key={index}
                isDisabled={type === 'FETCHING NEXT QUESTION'}
                bg={getButtonColor(answer)}
                justifyContent="space-between"
                onPress={() => setSelectedAnswer(answer)}
                $active={{bg: '$blue700'}}>
                <ButtonText>{answer}</ButtonText>
                <Box flexDirection="row" gap="$2">
                  {users.map(
                    (item: any) =>
                      item.selectedAnswer === answer &&
                      type === 'FETCHING NEXT QUESTION' && (
                        <Avatar
                          key={item.socket_id}
                          id={item.current_avatar}
                          boxH="$6"
                          boxW="$6"
                          imgH="$6"
                          imgW="$6"
                        />
                      ),
                  )}
                  {selectedAnswer === answer && type === 'PLAYING' && (
                    <Avatar
                      id={user?.current_avatar}
                      boxH="$6"
                      boxW="$6"
                      imgH="$6"
                      imgW="$6"
                    />
                  )}
                </Box>
              </Button>
            );
          })}
        </Box>
      </Box>
    </View>
  );
}
