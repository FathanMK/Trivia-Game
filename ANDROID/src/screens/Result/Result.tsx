import {Box, Button, ButtonText, Text, View} from '@gluestack-ui/themed';
import UserResult from './components/UserResult/UserResult';
import useResult from './hooks/useResult';

export default function Result({route}: {route: any}) {
  const {users} = route.params;
  const {handleBackToHome, handlePlayAgain} = useResult();
  return (
    <View
      flex={1}
      bg="$backgroundDark950"
      justifyContent="center"
      alignItems="center">
      <Box bg="$backgroundDark600" w="$5/6" rounded="$md" p="$4">
        <Text
          textAlign="center"
          fontWeight="$black"
          color="$textLight0"
          fontSize="$3xl"
          lineHeight="$3xl"
          mt="$4"
          mb="$8">
          results
        </Text>
        <Box gap="$4">
          {users
            .sort((a: any, b: any) => b.points - a.points)
            .map((item: any, index: any) => {
              return (
                <UserResult
                  key={item.socket_id}
                  username={item.username}
                  avatar_id={item.current_avatar}
                  index={index}
                />
              );
            })}
        </Box>
        <Box flexDirection="row" justifyContent="center" gap="$4" my="$8">
          <Button bg="$teal500" onPress={handlePlayAgain}>
            <ButtonText>play again</ButtonText>
          </Button>
          <Button bg="$purple500" onPress={handleBackToHome}>
            <ButtonText>back to home</ButtonText>
          </Button>
        </Box>
      </Box>
    </View>
  );
}
