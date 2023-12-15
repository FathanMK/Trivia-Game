import {TypedUseSelectorHook, useSelector} from 'react-redux';
import store from '../stores/store';

type RootState = ReturnType<typeof store.getState>;

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;
