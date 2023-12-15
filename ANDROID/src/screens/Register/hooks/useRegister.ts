import {useState} from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';
import {Alert} from 'react-native';
import useAppDispatch from '../../../interfaces/useAppDispatch';
import useAppNavigation from '../../../interfaces/useAppNavigation';
import axiosLaravel from '../../../config/axiosLaravel';
import {login} from '../../../stores/slices/user/userSlice';
import useAppSelector from '../../../interfaces/UseAppSelector';

interface INewUser {
  name?: string;
  username?: string;
  email?: string;
  current_avatar?: number;
  diamonds?: number;
  total_points?: number;
}

export default function useRegister() {
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();
  const {user} = useAppSelector(state => state.user);
  const [selectedAvatar, setSelectedAvatar] = useState(7);
  const [username, setUsername] = useState('');
  const [isMutationUserLoading, setMutationUserLoading] = useState(false);

  // GET FREE AVATARS
  const {data: freeAvatars, isLoading: loadingFreeAvatars} = useQuery({
    queryKey: ['free-avatars'],
    queryFn: async () => {
      const res = await axiosLaravel.get('/avatar-free');
      const {data} = res.data;
      return data;
    },
  });

  // REGISTERING MUTATION / AXIOS POST
  const registerMutation = useMutation({
    mutationFn: (newUser: INewUser) => {
      setMutationUserLoading(true);
      return axiosLaravel.post('/user', newUser);
    },
    onSuccess: response => {
      const {data} = response;
      if (data.code === 200) {
        const user = {
          ...data.data,
          points: 1,
        };
        dispatch(login(user));
        axiosLaravel.put(`/user/${user.id}`, {
          avatar_choices: [selectedAvatar.toString()],
        });
        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
      }
      setMutationUserLoading(false);
    },
    onError: error => {
      //@ts-ignore
      console.log(error.response);
      Alert.alert('Error', error.message);
      setMutationUserLoading(false);
    },
  });

  // SELECTING AVATAR
  const handleSelectingAvatar = (avatarId: number) => {
    setSelectedAvatar(avatarId);
  };

  const handleRegisterMutation = async (newUser: INewUser) => {
    registerMutation.mutate(newUser);
  };

  const handleRegister = () => {
    const newUser = {
      name: user?.displayName,
      email: user?.email,
      username,
      current_avatar: selectedAvatar,
      diamonds: 0,
      total_points: 0,
    };
    handleRegisterMutation(newUser);
  };

  return {
    navigation,
    freeAvatars,
    loadingFreeAvatars,
    selectedAvatar,
    handleSelectingAvatar,
    username,
    setUsername,
    isMutationUserLoading,
    handleRegister,
  };
}
