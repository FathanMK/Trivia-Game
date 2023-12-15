import {useState} from 'react';
import {
  FlatList,
  Modal,
  ModalBackdrop,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Pressable,
  View,
  Box,
  Text,
  Heading,
  ScrollView,
  Button,
  ButtonText,
  HStack,
  Image,
  Spinner,
} from '@gluestack-ui/themed';
import ADIcon from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';
import useModalAvatar from './hooks/useModalAvatar';
import AlertDialogLoading from '../../../../components/AlertDialogLoading/AlertDialogLoading';
import AvatarButton from './components/AvatarButton';

interface IModalDiamondProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalAvatar({isOpen, onClose}: IModalDiamondProps) {
  const {
    avatars,
    avatarType,
    setAvatarType,
    selectedAvatar,
    setSelectedAvatar,
    paidAvatarsLoading,
    freeAvatarsLoading,
    userAvatarsLoading,
    handleChangeAvatar,
    avatarLoadingChange,
  } = useModalAvatar();
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
              <Heading color="$textLight0">change avatars</Heading>
            </Box>
            <ModalCloseButton>
              <ADIcon name="close" color="white" size={22} />
            </ModalCloseButton>
          </ModalHeader>
          <ScrollView horizontal={true}>
            <HStack p="$4" gap="$4">
              <Button
                bg={avatarType === 'YOUR AVATARS' ? '$purple500' : '$blue500'}
                $active={{opacity: 0.5}}
                onPress={() => {
                  setAvatarType('YOUR AVATARS');
                }}>
                <ButtonText>your avatars</ButtonText>
              </Button>
              <Button
                bg={avatarType === 'FREE AVATARS' ? '$purple500' : '$blue500'}
                $active={{opacity: 0.5}}
                onPress={() => {
                  setAvatarType('FREE AVATARS');
                }}>
                <ButtonText>free avatars</ButtonText>
              </Button>
              <Button
                bg={avatarType === 'PAID AVATARS' ? '$purple500' : '$blue500'}
                $active={{opacity: 0.5}}
                onPress={() => {
                  setAvatarType('PAID AVATARS');
                }}>
                <ButtonText>paid avatars</ButtonText>
              </Button>
            </HStack>
          </ScrollView>
          <View
            h="$80"
            w="$full"
            alignItems="center"
            justifyContent="center"
            py="$8">
            {paidAvatarsLoading || userAvatarsLoading || freeAvatarsLoading ? (
              <Spinner size="small" />
            ) : (
              <FlatList
                data={avatars}
                keyExtractor={(item: any) => item.id}
                numColumns={3}
                renderItem={({item}: {item: any}) => (
                  <Box alignItems="center" justifyContent="center">
                    <AvatarButton
                      id={item.avatar_id ? item.avatar_id : item.id}
                      image_src={
                        item.image_src ? item.image_src : item.avatar.image_src
                      }
                      selectedAvatar={selectedAvatar as number}
                      onPress={() =>
                        setSelectedAvatar(
                          item.avatar_id ? item.avatar_id : item.id,
                        )
                      }
                    />
                    {avatarType === 'PAID AVATARS' && (
                      <Box
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="center"
                        gap="$1">
                        <IonIcon name="diamond" size={12} color="white" />
                        <Text color="$white" fontSize="$lg" fontWeight="900">
                          {item.price}
                        </Text>
                      </Box>
                    )}
                  </Box>
                )}
              />
            )}
          </View>
          <ModalFooter alignItems="center" justifyContent="center" gap="$4">
            <Button
              rounded="$full"
              w="$2/5"
              bg="$red500"
              onPress={onClose}
              $active={{opacity: 0.5}}>
              <ButtonText>cancel</ButtonText>
            </Button>
            <Button
              rounded="$full"
              w="$2/5"
              bg="$green500"
              onPress={handleChangeAvatar}
              $active={{opacity: 0.5}}>
              <ButtonText>save</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <AlertDialogLoading isOpen={avatarLoadingChange} />
    </>
  );
}
