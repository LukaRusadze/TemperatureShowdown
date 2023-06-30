import { createContext, useContext } from 'react';
import { Game } from '@utils';

export const GameContext = createContext<Game>(null!);

export const useGameState = () => useContext(GameContext);
