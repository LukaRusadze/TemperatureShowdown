import { CITIES } from '@constants';
import axios from 'axios';

interface IGame {
  gameDifficultyLevel: GameDifficultyLevel;
  gameInfo: GameDifficulty;
  currentCitiesInfo: City[];
  currentAnswers: string[];
  chooseDifficulty(difficulty: GameDifficultyLevel): void;
  nextRound(): Promise<City[]>;
}

export class Game implements IGame {
  private currentCities: string[] = [];
  private _currentCitiesInfo: City[] = [];
  private _currentAnswers: string[] = [];
  private _gameDifficultyLevel: GameDifficultyLevel = 'Easy';

  private readonly difficulties: GameDifficulties = {
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

  chooseDifficulty(difficulty: GameDifficultyLevel) {
    this._gameDifficultyLevel = difficulty;
  }

  async nextRound(): Promise<City[]> {
    this.getNewCities();
    const cityPromises: Promise<City>[] = this.currentCities.map(
      this.fetchCityDetails,
    );

    const newCitiesInfo = await Promise.all(cityPromises);

    this.findHighestTemperatures(newCitiesInfo);
    this._currentCitiesInfo = newCitiesInfo;
    return newCitiesInfo;
  }

  private fetchCityTemperature = async (city: string) => {
    const { data } = await axios.get<WeatherResponse>(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=a8002a35a44e8e3507b54d728fb635aa`,
    );

    return Math.round(data.main.temp);
  };

  private fetchCityImage = async (city: string) => {
    const { data } = await axios.get<ImageResponse>(
      `https://pixabay.com/api/?q=${city}&per_page=3&key=38071086-8f1a664b5219c8bbfb9cd12cc`,
    );
    return (
      data.hits[0]?.webformatURL ??
      'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg'
    );
  };

  private fetchCityDetails = async (city: string) => {
    const [temperature, image] = await Promise.all([
      this.fetchCityTemperature(city),
      this.fetchCityImage(city),
    ]);

    return { city, temperature, image };
  };

  private getNewCities() {
    this.currentCities.length = 0;
    for (let i = 0; i < this.gameInfo.cardAmount; i++) {
      const randomNumber = Math.floor(Math.random() * (CITIES.length - 1)) + 0;
      this.currentCities.push(CITIES[randomNumber]);
    }
  }

  private findHighestTemperatures(newCitiesInfo: City[]): void {
    let currentMax: City = newCitiesInfo[0];
    const max: City[] = [currentMax];
    for (let i = 1; i < newCitiesInfo.length; i++) {
      if (currentMax.temperature < newCitiesInfo[i].temperature) {
        currentMax = newCitiesInfo[i];
        max.length = 0;
        max.push(currentMax);
      } else if (currentMax.temperature === newCitiesInfo[i].temperature) {
        max.push(newCitiesInfo[i]);
      }
    }

    this._currentAnswers = max.map((item) => item.city);
  }

  get gameInfo(): GameDifficulty {
    return this.difficulties[this._gameDifficultyLevel];
  }

  get gameDifficultyLevel(): GameDifficultyLevel {
    return this._gameDifficultyLevel;
  }

  get currentCitiesInfo(): City[] {
    return this._currentCitiesInfo;
  }

  get currentAnswers(): string[] {
    return this._currentAnswers;
  }
}
