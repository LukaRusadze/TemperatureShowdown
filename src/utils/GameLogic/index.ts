interface IGame {
  readonly difficulties: GameDifficulties;
  gameDifficultyLevel: GameDifficultyLevel;
  chooseDifficulty(difficulty: GameDifficultyLevel): void;
  getGameInfo(): GameDifficulty;
}

export class Game implements IGame {
  readonly difficulties: GameDifficulties = {
    Easy: {
      roundAmount: 10,
      cardAmount: 2,
      mistakeChances: 1,
      helpAmount: 0,
      helpDismissalAmount: 0,
    },
    Medium: {
      roundAmount: 15,
      cardAmount: 3,
      mistakeChances: 1,
      helpAmount: 1,
      helpDismissalAmount: 1,
    },
    Hard: {
      roundAmount: 20,
      cardAmount: 4,
      mistakeChances: 1,
      helpAmount: 1,
      helpDismissalAmount: 2,
    },
  };

  gameDifficultyLevel: GameDifficultyLevel = 'Easy';

  chooseDifficulty(difficulty: GameDifficultyLevel) {
    this.gameDifficultyLevel = difficulty;
  }

  getGameInfo(): GameDifficulty {
    return this.difficulties[this.gameDifficultyLevel];
  }
}
