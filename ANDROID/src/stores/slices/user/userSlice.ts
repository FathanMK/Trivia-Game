import {createSlice} from '@reduxjs/toolkit';
import {IUser} from '../../../interfaces/IUser';

interface IInitialState {
  user: IUser | null;
}

const initialState: IInitialState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: state => {
      state.user = null;
    },
    updatePoints: (state, action) => {
      if (state.user) {
        state.user.points = action.payload;
      }
    },
  },
});

export const {login, logout, updatePoints} = userSlice.actions;

export default userSlice.reducer;
