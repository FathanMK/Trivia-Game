import {useNavigation} from '@react-navigation/native';
import type {TStackNavigation} from './StackNavigation';

const useAppNavigation = () => useNavigation<TStackNavigation>();

export default useAppNavigation;
