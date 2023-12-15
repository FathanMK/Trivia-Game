import {createSlice} from '@reduxjs/toolkit';
import {IQuestion} from '../../../interfaces/IQuestion';

interface QuestionState {
  questions: IQuestion[];
  tenQuestions: IQuestion[];
  questionProgress: number;
}

const initialState: QuestionState = {
  questions: [],
  tenQuestions: [],
  questionProgress: 0,
};

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    getAllQuestion: (state, action) => {
      state.questions = action.payload;
    },
    set10Questions: state => {
      state.tenQuestions = state.questions.slice(0, 5);
    },
    updateQuestionProgress: (state, action) => {
      state.questionProgress = state.questionProgress + action.payload;
    },
    clearQuestionProgress: state => {
      state.questionProgress = 0;
    },
  },
});

export const {
  getAllQuestion,
  set10Questions,
  updateQuestionProgress,
  clearQuestionProgress,
} = questionSlice.actions;

export default questionSlice.reducer;
