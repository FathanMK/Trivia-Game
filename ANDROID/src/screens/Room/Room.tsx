import {Box, Text, View, Pressable} from '@gluestack-ui/themed';
import ADIcon from 'react-native-vector-icons/AntDesign';
import User from './components/User/User';
import useRoom from './hooks/useRoom';

export default function Room() {
  const {roomData, type, handleGoBack} = useRoom();
  return (
    <>
      {roomData.countdown !== 0 && type === 'WAITING PLAYERS' ? (
        <Box bg="$backgroundDark950" px="$8" py="$10">
          <Pressable
            flexDirection="row"
            alignItems="center"
            gap="$2"
            $active={{opacity: 0.5}}
            onPress={handleGoBack}>
            <ADIcon name="left" color="white" size={20} />
            <Text color="$textLight0" fontWeight="900">
              back
            </Text>
          </Pressable>
        </Box>
      ) : null}
      <View
        flex={1}
        bg="$backgroundDark950"
        alignItems="center"
        justifyContent="center">
        <Text
          color="$textLight0"
          fontSize="$5xl"
          lineHeight="$5xl"
          fontWeight="900">
          {roomData.countdown === 0 ? '∞' : roomData.countdown}
        </Text>
        <Text
          color="$textLight0"
          fontSize="$2xl"
          lineHeight="$2xl"
          fontWeight="900">
          {roomData.countdown !== 0 && type === 'WAITING PLAYERS'
            ? 'waiting for the opponents'
            : 'fetching questions'}
        </Text>
        <Box w="$full" px="$6" pt="$8" gap="$4">
          {roomData.users.map((item: any) => {
            return (
              <User
                key={item.socket_id}
                avatar_id={item.current_avatar}
                username={item.username}
              />
            );
          })}
        </Box>
      </View>
    </>
  );
}
