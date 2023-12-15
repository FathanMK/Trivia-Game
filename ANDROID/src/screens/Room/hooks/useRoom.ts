import socket from '../../../config/socket';
import useAppNavigation from '../../../interfaces/useAppNavigation';
import {useEffect, useState} from 'react';
import axiosGRPC from '../../../config/axiosGRPC';
import useAppDispatch from '../../../interfaces/useAppDispatch';
import {
  getAllQuestion,
  set10Questions,
} from '../../../stores/slices/question/questionSlice';

export default function useRoom() {
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();
  const [roomData, setRoomData] = useState({
    name: '',
    countdown: 30,
    users: [],
  });
  const [type, setType] = useState('WAITING PLAYERS');

  const handleGoBack = () => {
    socket.emit('LEAVE ROOM');
    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
  };

  useEffect(() => {
    socket.on('WAITING PLAYERS', (value: any) => {
      setRoomData(value.room);
      setType(value.type);
    });
    socket.on('GAME START', async () => {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Game',
            params: {
              currentQuestion: 0,
              currentRoom: roomData.name,
            },
          },
        ],
      });
    });

    return () => {
      socket.off('WAITING PLAYERS');
      socket.off('GAME START');
    };
  }, []);

  useEffect(() => {
    async function getQuestions() {
      await axiosGRPC.get('/questions').then(res => {
        const {data} = res.data;
        dispatch(getAllQuestion(data));
        dispatch(set10Questions());
      });
    }

    getQuestions();
  }, []);

  useEffect(() => {
    if (roomData.countdown === 0 && type === 'FETCHING QUESTIONS') {
      navigation.reset({
        index: 0,
        routes: [{name: 'Game'}],
      });
    }
  }, [roomData]);

  return {
    type,
    roomData,
    handleGoBack,
  };
}
