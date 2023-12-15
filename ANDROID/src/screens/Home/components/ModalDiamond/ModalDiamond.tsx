import {
  FlatList,
  Modal,
  ModalBackdrop,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Pressable,
  Text,
  View,
  Box,
  Heading,
  ModalFooter,
  Button,
  ButtonText,
} from '@gluestack-ui/themed';
import ADIcon from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {diamonds} from './data/diamonds';
import formatIDRCurrency from '../../../../utils/formatIDRCurrency';
import useModalDiamond from './hooks/useModalDiamond';
import AlertDialogLoading from '../../../../components/AlertDialogLoading/AlertDialogLoading';

interface IModalDiamondProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalDiamond({isOpen, onClose}: IModalDiamondProps) {
  const {handlePostTopUp, isLoading} = useModalDiamond();
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalBackdrop />
        <ModalContent bg="$backgroundDark600">
          <ModalHeader justifyContent="flex-end">
            <ModalCloseButton opacity={0}>
              <ADIcon name="close" color="white" size={22} />
            </ModalCloseButton>
            <Box alignItems="center" justifyContent="center" flex={1}>
              <Heading color="$textLight0">top up diamonds</Heading>
            </Box>
            <ModalCloseButton>
              <ADIcon name="close" color="white" size={22} />
            </ModalCloseButton>
          </ModalHeader>
          <View
            alignItems="center"
            justifyContent="center"
            h="$80"
            w="$full"
            py="$8">
            <FlatList
              data={diamonds}
              numColumns={2}
              keyExtractor={(item: any) => item.id}
              renderItem={({item}: {item: any}) => (
                <Pressable
                  disabled={isLoading}
                  flexBasis="$2/5"
                  bg="$pink600"
                  p="$4"
                  m="$2"
                  rounded="$lg"
                  alignItems="center"
                  justifyContent="center"
                  $active={{bg: '$pink800'}}
                  onPress={() =>
                    handlePostTopUp({
                      id: item.id,
                      name: item.name,
                      price: item.price,
                      quantity: 1,
                    })
                  }>
                  <Box alignItems="center" justifyContent="center">
                    <IonIcon name="diamond" size={20} color="white" />
                    <Text color="$white" fontWeight="600">
                      {item.diamonds}
                    </Text>
                  </Box>
                  <Text color="$white" fontWeight="900" mt="$3" fontSize="$sm">
                    {formatIDRCurrency(item.price)}
                  </Text>
                </Pressable>
              )}
            />
          </View>
          <ModalFooter>
            <Button
              disabled={isLoading}
              rounded="$full"
              w="$full"
              bg="$red500"
              $active={{opacity: 0.5}}
              onPress={onClose}>
              <ButtonText>cancel</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <AlertDialogLoading isOpen={isLoading} />
    </>
  );
}
