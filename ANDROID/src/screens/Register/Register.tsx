import {
  Box,
  Button,
  ButtonText,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  Pressable,
  Text,
  View,
} from '@gluestack-ui/themed';
import ADIcon from 'react-native-vector-icons/AntDesign';
import AvatarRegister from './components/AvatarRegister/AvatarRegister';
import AlertDialogLoading from '../../components/AlertDialogLoading/AlertDialogLoading';
import useRegister from './hooks/useRegister';
import useAppSelector from '../../interfaces/UseAppSelector';

export default function Register() {
  const {navigation, isMutationUserLoading, setUsername, handleRegister} =
    useRegister();
  return (
    <>
      <Box bg="$backgroundDark950" px="$8" py="$10">
        <Pressable
          flexDirection="row"
          alignItems="center"
          gap="$2"
          $active={{opacity: 0.5}}
          onPress={() => navigation.goBack()}>
          <ADIcon name="left" color="white" size={20} />
          <Text color="$textLight0" fontWeight="900">
            back
          </Text>
        </Pressable>
      </Box>
      <View flex={1} bg="$backgroundDark950" alignItems="center">
        <Text
          mt="$10"
          color="$textLight0"
          fontSize="$2xl"
          lineHeight="$2xl"
          fontWeight="900">
          register your account
        </Text>
        <AvatarRegister />
        <Input
          w="$5/6"
          mt="$16"
          size="lg"
          bg="$backgroundLight0"
          alignItems="center"
          justifyContent="center">
          <InputSlot>
            <InputIcon ml="$2">
              <ADIcon name="form" color="black" size={20} />
            </InputIcon>
          </InputSlot>
          <InputField
            color="$textDark950"
            placeholder="Username"
            onChangeText={setUsername}
          />
        </Input>
        <Button
          w="$1/2"
          mt="$8"
          rounded="$full"
          bg="$backgroundLight0"
          alignItems="center"
          justifyContent="center"
          $active={{bg: '$backgroundLight200'}}
          onPress={handleRegister}>
          <ButtonText color="$textDark950" fontWeight="900">
            register
          </ButtonText>
        </Button>
      </View>
      <AlertDialogLoading isOpen={isMutationUserLoading} />
    </>
  );
}
