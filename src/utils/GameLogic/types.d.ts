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

interface City {
  city: string;
  temperature: number;
  image: string;
}

interface CountriesResponse {
  data: {
    iso2: string;
    iso3: string;
    country: string;
    cities: string[];
  }[];
  error: boolean;
  msg: string;
}

interface WeatherResponse {
  base: string;
  clouds: {
    all: number;
  };
  cod: number;
  coord: {
    lat: number;
    lon: number;
  };
  dt: number;
  id: number;
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  name: string;
  sys: {
    country: string;
    id: number;
    sunrise: number;
    sunset: number;
    type: number;
  };
  timezone: number;
  visibility: number;
  weather: Array<{
    description: string;
    icon: string;
    id: number;
    main: string;
  }>;
  wind: {
    deg: number;
    speed: number;
  };
}

interface ImageResponse {
  total: number;
  totalHits: number;
  hits: Array<{
    id: number;
    pageURL: string;
    type: string;
    tags: string;
    previewURL: string;
    previewWidth: number;
    previewHeight: number;
    webformatURL: string;
    webformatWidth: number;
    webformatHeight: number;
    largeImageURL: string;
    imageWidth: number;
    imageHeight: number;
    imageSize: number;
    views: number;
    downloads: number;
    collections: number;
    likes: number;
    comments: number;
    user_id: number;
    user: string;
    userImageURL: string;
  }>;
}
