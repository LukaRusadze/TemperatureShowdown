import { useGameState } from '@context';
import { useCallback, useEffect, useState } from 'react';

const useCitiesDataRandomizer = () => {
  const gameInstance = useGameState();
  const [isLoading, setIsLoading] = useState(true);
  const [cities, setCities] = useState<City[]>([]);
  const [error, setError] = useState<unknown>(undefined);

  const randomize = useCallback(async () => {
    try {
      setCities(await gameInstance.nextRound());
    } catch (e) {
      setError(e);
    }
  }, [gameInstance]);

  useEffect(() => {
    randomize().then(() => setIsLoading(false));
  }, [randomize]);

  return {
    cities,
    isLoading,
    error,
    isError: typeof error !== 'undefined',
    randomize,
  };
};

export { useCitiesDataRandomizer };
