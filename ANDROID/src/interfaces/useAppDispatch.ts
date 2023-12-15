import {useDispatch} from 'react-redux';
import store from '../stores/store';

type AppDispatch = typeof store.dispatch;

const useAppDispatch = () => useDispatch<AppDispatch>();

export default useAppDispatch;
