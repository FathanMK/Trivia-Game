import socket from '../../../config/socket';
import useAppSelector from '../../../interfaces/UseAppSelector';
import useAppNavigation from '../../../interfaces/useAppNavigation';

export default function useResult() {
  const navigation = useAppNavigation();
  const {user} = useAppSelector(state => state.user);

  const handlePlayAgain = () => {
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

  const handleBackToHome = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
  };
  return {handleBackToHome, handlePlayAgain};
}
