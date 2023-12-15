import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/user/userSlice';
import questionReducer from './slices/question/questionSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    question: questionReducer,
  },

  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export default store;
