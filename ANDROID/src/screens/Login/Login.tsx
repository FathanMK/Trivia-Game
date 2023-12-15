import {Box, Text, View} from '@gluestack-ui/themed';
import ContinueWithGoogle from './components/ContinueWithGoogle';

export default function Login() {
  return (
    <View
      flex={1}
      bg="$backgroundDark950"
      justifyContent="center"
      alignItems="center">
      <Box flex={1} alignItems="center" justifyContent="center">
        <Text
          fontSize="$3xl"
          lineHeight="$3xl"
          textAlign="center"
          fontWeight="900"
          fontStyle="italic"
          color="$textLight0">
          trivia
        </Text>
      </Box>
      <Box pb="$16" px="$8">
        <ContinueWithGoogle />
        <Text
          color="$textLight0"
          fontSize="$xs"
          textAlign="center"
          fontWeight="800"
          lineHeight="$xs"
          mt="$4">
          by continue, you agree to out privacy terms & conditions
        </Text>
      </Box>
    </View>
  );
}
