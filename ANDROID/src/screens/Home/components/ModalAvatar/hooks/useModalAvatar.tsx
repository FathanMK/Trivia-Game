import {useQuery, useQueryClient} from '@tanstack/react-query';
import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import axiosLaravel from '../../../../../config/axiosLaravel';
import useAppSelector from '../../../../../interfaces/UseAppSelector';
import useAppDispatch from '../../../../../interfaces/useAppDispatch';
import {login} from '../../../../../stores/slices/user/userSlice';

export default function useModalAvatar() {
  const {user} = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const [avatars, setAvatars] = useState();
  const [avatarType, setAvatarType] = useState('YOUR AVATARS');
  const [selectedAvatar, setSelectedAvatar] = useState(user?.current_avatar);
  const [avatarLoadingChange, setAvatarLoadingChange] = useState(false);

  const {data: freeAvatarsQuery, isLoading: paidAvatarsLoading} = useQuery({
    queryKey: ['free-avatars'],
    queryFn: async () => {
      const res = await axiosLaravel.get('/avatar-free');
      const {data} = res.data;
      return data;
    },
  });

  const {data: paidAvatarsQuery, isLoading: freeAvatarsLoading} = useQuery({
    queryKey: ['paid-avatars'],
    queryFn: async () => {
      const res = await axiosLaravel.get('/avatar-paid');
      const {data} = res.data;
      return data;
    },
  });

  const {data: userAvatarsQuery, isLoading: userAvatarsLoading} = useQuery({
    queryKey: ['user-avatars', user?.id],
    queryFn: async () => {
      const res = await axiosLaravel.get(`/user-avatar`);
      const {data} = res.data;
      const avatars = data.filter((item: any) => item.user_id === user?.id);
      return avatars;
    },
  });

  const handleChangeAvatar = async () => {
    setAvatarLoadingChange(true);
    const resAvatar = await axiosLaravel.get(`/avatar/${selectedAvatar}`);
    const {data: avatarData} = resAvatar.data;
    const avatar_choices = userAvatarsQuery.map((item: any) =>
      item.avatar_id.toString(),
    );
    const avatarExist = userAvatarsQuery.find(
      (item: any) => item.avatar_id === selectedAvatar,
    );
    const newAvatarChoices = [...avatar_choices, selectedAvatar?.toString()];

    if (user?.diamonds! < avatarData.price) {
      Alert.alert('ERROR', 'Top Up Diamond First');
      setAvatarLoadingChange(false);
      return;
    }

    if (avatarExist) {
      await axiosLaravel.put(`/user/${user?.id}`, {
        current_avatar: selectedAvatar,
      });
      await queryClient.fetchQuery({
        queryKey: ['user'],
        queryFn: async () => {
          const {data} = await axiosLaravel.get(`/user/${user?.id}`);
          const userData = {
            ...data.data,
            points: 1,
          };
          dispatch(login(userData));
          return userData;
        },
      });
      setAvatarLoadingChange(false);
      Alert.alert('SUCCESS', 'Successfully changed avatar');
      return;
    }
    await axiosLaravel.put(`/user/${user?.id}`, {
      current_avatar: selectedAvatar,
      avatar_choices: newAvatarChoices,
      diamonds: user?.diamonds! - avatarData.price,
    });
    await queryClient.fetchQuery({
      queryKey: ['user'],
      queryFn: async () => {
        const {data} = await axiosLaravel.get(`/user/${user?.id}`);
        const userData = {
          ...data.data,
          points: 1,
        };
        dispatch(login(userData));
        return userData;
      },
    });
    await queryClient.invalidateQueries({queryKey: ['user-avatars', user?.id]});
    setAvatarLoadingChange(false);
    Alert.alert('SUCCESS', 'Successfully changed avatar');
  };

  useEffect(() => {
    if (avatarType === 'FREE AVATARS') {
      setAvatars(freeAvatarsQuery);
    }
    if (avatarType === 'PAID AVATARS') {
      setAvatars(paidAvatarsQuery);
    }
    if (avatarType === 'YOUR AVATARS') {
      setAvatars(userAvatarsQuery);
    }
  }, [avatarType]);

  return {
    avatars,
    avatarType,
    setAvatarType,
    selectedAvatar,
    setSelectedAvatar,
    paidAvatarsLoading,
    freeAvatarsLoading,
    userAvatarsLoading,
    avatarLoadingChange,
    handleChangeAvatar,
  };
}
