type GameDifficultyLevel = 'Easy' | 'Medium' | 'Hard';

interface GameDifficulty {
  roundAmount: number;
  cardAmount: number;
  mistakeChances: number;
  helpAmount: number;
  helpDismissalAmount: number;
}

type GameDifficulties = {
  [key in GameDifficultyLevel]: GameDifficulty;
};
