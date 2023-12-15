import {Box, Button, ButtonText, Text, View} from '@gluestack-ui/themed';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import {Pressable} from '@gluestack-ui/themed';

import useHome from './hooks/useHome';
import Avatar from '../../components/Avatar/Avatar';
import ModalDiamond from './components/ModalDiamond/ModalDiamond';
import ModalAvatar from './components/ModalAvatar/ModalAvatar';

export default function Home() {
  const {
    handleStartGame,
    handleSignOut,
    openAvatarModal,
    handleOpenAvatarModal,
    openDiamondModal,
    handleOpenDiamondModal,
    user,
  } = useHome();
  return (
    <>
      <View
        flex={1}
        bg="$backgroundDark950"
        justifyContent="center"
        alignItems="center">
        <Box w="$full" mt="$20">
          <Box w="$full" alignItems="flex-end" pr="$8">
            <Pressable
              flexDirection="row"
              gap="$2"
              bg="rgba(252, 252, 252,0.25)"
              rounded="$lg"
              p="$2"
              alignItems="center"
              justifyContent="center"
              $active={{opacity: 0.5}}
              onPress={handleOpenDiamondModal}>
              <IonIcon name="diamond" size={14} color="white" />
              <Text color="$textLight0" fontSize="$lg" fontWeight="900">
                {user?.diamonds}
              </Text>
            </Pressable>
          </Box>
          <Box alignSelf="center" mt="$10">
            <Pressable
              position="relative"
              onPress={handleOpenAvatarModal}
              $active={{opacity: 0.5}}>
              <Avatar
                boxH="$20"
                boxW="$20"
                imgH="$20"
                imgW="$20"
                id={user?.current_avatar}
              />
              <Box
                position="absolute"
                bottom={0}
                right={0}
                bg="$white"
                p="$1"
                rounded="$full">
                <FAIcon name="pencil" color="black" size={14} />
              </Box>
            </Pressable>
          </Box>
          <Text
            alignSelf="center"
            fontSize="$xl"
            fontWeight="800"
            color="$backgroundLight0"
            mt="$3"
            numberOfLines={1}>
            {user?.username}
          </Text>
        </Box>
        <Box
          w="$full"
          px="$8"
          mt="auto"
          mb="$20"
          flexDirection="column"
          gap="$4">
          <Button rounded="$full" bg="$green600" onPress={handleStartGame}>
            <ButtonText>start game</ButtonText>
          </Button>
          <Button rounded="$full" bg="$red600" onPress={handleSignOut}>
            <ButtonText>sign out</ButtonText>
          </Button>
        </Box>
      </View>
      <ModalDiamond
        isOpen={openDiamondModal}
        onClose={handleOpenDiamondModal}
      />
      <ModalAvatar isOpen={openAvatarModal} onClose={handleOpenAvatarModal} />
    </>
  );
}
