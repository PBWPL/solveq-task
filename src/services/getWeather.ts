import config from '../config/config';

import https from 'https';

export function getWeather(lat: number, lon: number) {
  if (process.env.NODE_ENV === 'development') {
    return import('../test-weather.json');
  }

  const apiKey = config.WEATHER_API;
  const URL = 'https://api.openweathermap.org/data/2.5/weather';

  const endPoint = `${URL}?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  let data = '';

  return new Promise((resolve, reject) => {
    https.get(endPoint, (response) => {
      response.on('error', (err) => reject(err));
      response.on('data', (chunk) => (data += chunk));
      response.on('end', () => resolve(JSON.parse(data)));
    });
  });
}
