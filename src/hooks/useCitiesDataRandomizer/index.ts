import { useGameState } from '@context';
import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchCitiesList, fetchCityWeather } from './utils';

const useCitiesDataRandomizer = () => {
  const gameInstance = useGameState();
  const [isLoading, setIsLoading] = useState(true);
  const [cities, setCities] = useState<City[]>([]);
  const [error, setError] = useState<unknown>(undefined);
  const fullCitiesList = useRef<string[]>([]);

  const randomize = useCallback(async () => {
    setIsLoading(true);
    const { cardAmount } = gameInstance.getGameInfo();

    const output: string[] = [];
    for (let i = 0; i < cardAmount; i++) {
      const randomNumber =
        Math.floor(Math.random() * (fullCitiesList.current.length - 1)) + 0;
      output.push(fullCitiesList.current[randomNumber]);
    }

    try {
      const weatherPromises: Promise<City>[] = [];
      for (const city of output) {
        weatherPromises.push(fetchCityWeather(city));
      }
      const weathers = await Promise.all(weatherPromises);
      setCities(weathers);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }, [gameInstance]);

  useEffect(() => {
    fetchCitiesList(fullCitiesList).then(randomize);
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
