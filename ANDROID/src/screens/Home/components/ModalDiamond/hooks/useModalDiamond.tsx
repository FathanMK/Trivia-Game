import InAppBrowser from 'react-native-inappbrowser-reborn';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useState} from 'react';
import axiosMidtrans from '../../../../../config/axiosMidtrans';
import useAppSelector from '../../../../../interfaces/UseAppSelector';
import useAppDispatch from '../../../../../interfaces/useAppDispatch';
import axiosLaravel from '../../../../../config/axiosLaravel';
import {login} from '../../../../../stores/slices/user/userSlice';

export default function useModalDiamond() {
  const [isLoading, setLoading] = useState(false);
  const {user} = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (transaction: any) => {
      setLoading(true);
      return axiosMidtrans.post('/payment', transaction);
    },
    onSuccess: data => {
      const response = data.data.data;
      InAppBrowser.open(response.redirect_url).then(async () => {
        await queryClient.fetchQuery({
          queryKey: ['user'],
          queryFn: async () => {
            const {data} = await axiosLaravel.get(`/user/${user?.id}`);
            const userData = {
              ...data.data,
              points: 1,
            };
            dispatch(login(userData));
            setLoading(false);
            return userData;
          },
        });
      });
    },
    onError: (error: any) => {
      setLoading(false);
      console.error(JSON.stringify(error.response.data, null, 2));
    },
  });

  const handlePostTopUp = (diamond: any) => {
    const transaction = {
      diamond,
      user_detail: {
        first_name: user?.username,
        last_name: '',
        email: user?.email,
      },
      user_id: user?.id,
      diamond_before: user?.diamonds,
    };
    mutation.mutate(transaction);
  };

  return {
    handlePostTopUp,
    isLoading,
  };
}
