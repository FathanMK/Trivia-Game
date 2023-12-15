export interface IRoom {
  [key: string]: {
    users?: {
      socket_id?: string;
      username: string;
      current_avatar: number;
      points: number;
      selectedAnswer?: string;
      selectedAnswerTimer?: number;
    }[];
    roomCountdown?: number;
    roomCountdownTimer?: NodeJS.Timeout;
    fetchingQuestionsCountdown?: number;
    fetchingQuestionsCountdownTimer?: NodeJS.Timeout;
    questionCountdown?: number;
    questionCountdownTimer?: NodeJS.Timeout;
    isRevealingAnswers?: boolean;
    revealingAnswers?: number;
    revealingAnswersTimer?: NodeJS.Timeout;
  };
}
