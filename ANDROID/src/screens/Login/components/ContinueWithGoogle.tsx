import {Button, ButtonText, Box, Spinner} from '@gluestack-ui/themed';
import ADIcon from 'react-native-vector-icons/AntDesign';
import useLogin from '../hooks/useLogin';
import AlertDialogLoading from '../../../components/AlertDialogLoading/AlertDialogLoading';

export default function ContinueWithGoogle() {
  const {handlePress, disabledLogin, isLoading} = useLogin();
  const ButtonTextWhenLoading = () => {
    return isLoading ? (
      <Spinner size="large" color="$backgroundLight0" />
    ) : (
      <>
        <Box mr="$2">
          <ADIcon name="google" color="#171717" size={18} />
        </Box>
        <ButtonText color="$textDark950" fontWeight="900">
          continue with google
        </ButtonText>
      </>
    );
  };
  return (
    <>
      <Button
        isDisabled={disabledLogin}
        rounded="$full"
        bg="$backgroundLight0"
        alignItems="center"
        justifyContent="center"
        $active={{bg: '$backgroundLight200'}}
        onPress={handlePress}>
        <ButtonTextWhenLoading />
      </Button>
      <AlertDialogLoading isOpen={isLoading} />
    </>
  );
}
