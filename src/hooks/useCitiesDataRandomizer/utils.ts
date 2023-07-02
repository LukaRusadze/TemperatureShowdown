import axios from 'axios';

export async function fetchCityWeather(city: string): Promise<City> {
  const { data } = await axios.get<WeatherResponse>(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=a8002a35a44e8e3507b54d728fb635aa`,
  );
  return { city, temperature: Math.round(data.main.temp) };
}
export async function fetchCitiesList(ref: React.MutableRefObject<string[]>) {
  const { data } = await axios
    .get<CountriesResponse>('https://countriesnow.space/api/v0.1/countries')
    .then();

  ref.current = data.data.map((country) => country.cities).flat();
}
