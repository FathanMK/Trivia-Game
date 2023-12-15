import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useState} from 'react';
import useAppDispatch from '../../../interfaces/useAppDispatch';
import {logout} from '../../../stores/slices/user/userSlice';
import useAppNavigation from '../../../interfaces/useAppNavigation';
import useAppSelector from '../../../interfaces/UseAppSelector';
import socket from '../../../config/socket';

export default function useHome() {
  const [openDiamondModal, setOpenDiamondModal] = useState(false);
  const [openAvatarModal, setOpenAvatarModal] = useState(false);
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.user);
  const handleSignOut = async () => {
    try {
      socket.disconnect();
      await GoogleSignin.signOut();
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
      dispatch(logout());
    } catch (error) {
      console.error(error);
    }
  };

  const handleStartGame = () => {
    socket.connect();
    socket.emit('JOIN ROOM', {
      player: {
        username: user?.username,
        current_avatar: user?.current_avatar,
        points: 0,
      },
    });
    navigation.reset({
      index: 0,
      routes: [{name: 'Room'}],
    });
  };

  const handleOpenDiamondModal = () => {
    setOpenDiamondModal(!openDiamondModal);
  };

  const handleOpenAvatarModal = () => {
    setOpenAvatarModal(!openAvatarModal);
  };

  return {
    handleSignOut,
    handleStartGame,
    openDiamondModal,
    handleOpenDiamondModal,
    openAvatarModal,
    handleOpenAvatarModal,
    user,
  };
}
