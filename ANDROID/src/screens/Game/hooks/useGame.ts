import {useEffect, useState} from 'react';
import type {IQuestion} from '../../../interfaces/IQuestion';
import socket from '../../../config/socket';
import useAppSelector from '../../../interfaces/UseAppSelector';
import useAppDispatch from '../../../interfaces/useAppDispatch';
import {updatePoints} from '../../../stores/slices/user/userSlice';
import {
  updateQuestionProgress,
  clearQuestionProgress,
} from '../../../stores/slices/question/questionSlice';
import useAppNavigation from '../../../interfaces/useAppNavigation';

export default function useGame({currentQuestion}: {currentQuestion: number}) {
  const {user} = useAppSelector(state => state.user);
  const {tenQuestions, questionProgress} = useAppSelector(
    state => state.question,
  );
  const dispatch = useAppDispatch();
  const [roomData, setRoomData] = useState({
    countdown: 10,
    name: '',
  });
  const [type, setType] = useState('PLAYING');
  const navigation = useAppNavigation();
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [answers, setAnswers] = useState<string[]>([]);
  const [question, setQuestion] = useState<IQuestion>();
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [users, setUsers] = useState([{username: user?.username, points: 1}]);
  const [usersWithPoints, setUsersWithPoints] = useState([]);

  useEffect(() => {
    if (roomData.name !== '') {
      socket.emit('SELECT ANSWER', {
        room: roomData.name,
        username: user?.username,
        selectedAnswer,
        selectTimeAnswer: roomData.countdown,
      });
    }
  }, [selectedAnswer]);

  useEffect(() => {
    dispatch(clearQuestionProgress());
    socket.on('PLAYING', (value: any) => {
      setRoomData(value.room);
      setType(value.type);
    });

    socket.on('RETURN ANSWERS', value => {
      setUsers(value.users);
    });
    socket.on('RETURN POINTS', value => {
      setUsersWithPoints(value.users);
      dispatch(
        updatePoints(
          value.users.find((item: any) => item.username === user?.username)
            .points,
        ),
      );
    });
    socket.on('NEXT QUESTION', () => {
      if (currentQuestion + 1 === tenQuestions.length) {
        return;
      }
      navigation.reset({
        index: 0,
        routes: [
          {name: 'Game', params: {currentQuestion: currentQuestion + 1}},
        ],
      });
    });

    return () => {
      socket.off('RETURN ANSWERS');
      socket.off('RETURN POINTS');
      socket.off('PLAYING');
      socket.off('NEXT QUESTION');
    };
  }, []);

  useEffect(() => {
    if (currentQuestion < tenQuestions.length) {
      setQuestion({
        question: tenQuestions[currentQuestion].question,
        answer: tenQuestions[currentQuestion].answer,
        wrong_answer_1: tenQuestions[currentQuestion].wrong_answer_1,
        wrong_answer_2: tenQuestions[currentQuestion].wrong_answer_2,
        wrong_answer_3: tenQuestions[currentQuestion].wrong_answer_3,
      });
    }
  }, []);

  useEffect(() => {
    setAnswers(
      [
        question?.answer!,
        question?.wrong_answer_1!,
        question?.wrong_answer_2!,
        question?.wrong_answer_3!,
      ]
        .filter(item => item !== null)
        .sort(() => Math.random() - 0.5),
    );
    setCorrectAnswer(question?.answer!);
  }, [question]);

  useEffect(() => {
    if (selectedAnswer !== '') {
      socket.emit('SELECT ANSWER', {
        room: roomData.name,
        username: user?.username,
        selectedAnswer,
        selectTimeAnswer: roomData.countdown,
      });
    }
  }, [selectedAnswer]);

  useEffect(() => {
    if (roomData.countdown === 0 && type === 'PLAYING') {
      socket.emit('BOTS SELECT ANSWER', {
        room: roomData.name,
        answers,
      });
      socket.emit('START REVEALING ANSWERS', {
        name: roomData.name,
      });
    }

    if (roomData.countdown === 0 && type === 'FETCHING NEXT QUESTION') {
      if (currentQuestion + 1 === tenQuestions.length) {
        socket.emit('LEAVE ROOM');
        navigation.reset({
          index: 0,
          routes: [{name: 'Result', params: {users: usersWithPoints}}],
        });
        return;
      }
      socket.emit('RESTART QUESTION TIMER', {
        name: roomData.name,
      });
      socket.emit('DISTRIBUTE POINTS', {
        room: roomData.name,
        correctAnswer,
        users,
      });
    }
  }, [roomData]);

  useEffect(() => {
    dispatch(
      updateQuestionProgress(
        ((currentQuestion + 1) / tenQuestions.length) * 100,
      ),
    );
  }, []);

  const getButtonColor = (answer: string) => {
    if (type === 'FETCHING NEXT QUESTION') {
      if (answer === correctAnswer) {
        return '$green500';
      } else if (answer === selectedAnswer) {
        return '$red500';
      }
    }
    return '$blue500';
  };

  return {
    selectedAnswer,
    setSelectedAnswer,
    question,
    answers,
    roomData,
    type,
    users,
    user,
    getButtonColor,
    tenQuestions,
    questionProgress,
  };
}
