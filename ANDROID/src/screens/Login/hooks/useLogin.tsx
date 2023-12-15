import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {useState} from 'react';
import {useMutation} from '@tanstack/react-query';
import {login} from '../../../stores/slices/user/userSlice';
import axiosLaravel from '../../../config/axiosLaravel';
import {useNavigation} from '@react-navigation/native';
import type {TStackNavigation} from '../../../interfaces/StackNavigation';

export default function useLogin() {
  const [isLoading, setLoading] = useState(false);
  const [disabledLogin, setDisabledLogin] = useState(false);
  const navigation = useNavigation<TStackNavigation>();
  const dispatch = useDispatch();
  const useGoogleLogin = () => {
    const loginWithGoogleService = async () => {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      setLoading(true);
      return auth().signInWithCredential(googleCredential);
    };

    const handleLogin = async () => {
      try {
        const data = await loginWithGoogleService();
        dispatch(login(data.user));
        return data.user.email;
      } catch (error) {
        setDisabledLogin(false);
      }
    };

    return handleLogin;
  };

  const checkUserMutation = useMutation({
    mutationFn: (email: string) => {
      return axiosLaravel.post('/checkUser', {email});
    },

    onSuccess: response => {
      setLoading(false);
      setDisabledLogin(false);
      const {data} = response;
      if (data.isUserExist) {
        const user = {
          ...data.data,
          points: 1,
        };
        dispatch(login(user));
        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{name: 'Register'}],
        });
      }
    },

    onError: () => {
      setLoading(false);
      setDisabledLogin(false);
    },
  });

  const handlePress = async () => {
    setDisabledLogin(true);
    const handleLogin = useGoogleLogin();
    const email = await handleLogin();
    if (email) {
      checkUserMutation.mutate(email);
    }
  };

  return {handlePress, isLoading, disabledLogin};
}
