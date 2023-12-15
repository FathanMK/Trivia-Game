import {Box, Text} from '@gluestack-ui/themed';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {useMutation} from '@tanstack/react-query';
import {useEffect} from 'react';
import Avatar from '../../../../components/Avatar/Avatar';
import axiosLaravel from '../../../../config/axiosLaravel';
import useAppSelector from '../../../../interfaces/UseAppSelector';
import {useDispatch} from 'react-redux';
import {login} from '../../../../stores/slices/user/userSlice';

interface IUserResultProps {
  index: any;
  username: string;
  avatar_id: number;
}

function formatRankColor(index: any) {
  switch (index) {
    case 0:
      return '$amber500';
    case 1:
      return '$purple500';
    case 2:
      return '$darkBlue500';
    default:
      return `$textDark950`;
  }
}
function formatRank(index: any) {
  switch (index) {
    case 0:
      return '1ST';
    case 1:
      return '2ND';
    case 2:
      return '3RD';
    default:
      return `${index + 1}TH`;
  }
}
function formatDiamond(index: any) {
  switch (index) {
    case 0:
      return 50;
    case 1:
      return 25;
    case 2:
      return 10;
    default:
      return 1;
  }
}

export default function UserResult({
  index,
  username,
  avatar_id,
}: IUserResultProps) {
  const {user} = useAppSelector(state => state.user);
  const dispatch = useDispatch();
  const mutation = useMutation({
    mutationFn: () => {
      return axiosLaravel.put(`/user/${user?.id}`, {
        diamonds: user?.diamonds! + formatDiamond(index),
      });
    },
    onSuccess: async () => {
      const res = await axiosLaravel.get(`/user/${user?.id}`);
      const {data} = res.data;
      const userData = {
        ...data,
        points: 1,
      };
      dispatch(login(userData));
    },
  });
  useEffect(() => {
    if (username.includes('Bot')) {
      return;
    }
    mutation.mutate();
  }, []);
  return (
    <Box
      flexDirection="row"
      rounded="$md"
      bg="$backgroundLight0"
      p="$4"
      justifyContent="space-between">
      <Box flexDirection="row" alignItems="center" gap="$4">
        <Text color={formatRankColor(index)} fontWeight="900" fontSize="$xl">
          {formatRank(index)}
        </Text>
        <Avatar id={avatar_id} imgH="$8" imgW="$8" />
        <Text fontWeight="900" color="$textDark950">
          {username}
        </Text>
      </Box>
      <Box flexDirection="row" alignItems="center" gap="$2">
        <IonIcon name="diamond" size={18} color="blue" />
        <Text fontWeight="900" color="$textDark950">
          {formatDiamond(index)}
        </Text>
      </Box>
    </Box>
  );
}
