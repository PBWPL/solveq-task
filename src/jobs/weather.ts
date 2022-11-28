import config from '../config/config';
import { initSequelize } from '../lib/db';
import { City } from '../models/city.model';
import { Weather } from '../models/weather.model';
import { getWeather } from '../services/getWeather';

const sequelize = initSequelize(config);

sequelize
  .sync()
  .then(() => {
    City.findAll()
      .then((cities) => {
        const data = cities.map(async (city) => {
          return {
            cityId: city.id,
            rawData: JSON.stringify(await getWeather(city.coordinate.coordinates[0], city.coordinate.coordinates[1]))
          };
        });
        Promise.all(data).then((data) => {
          Weather.destroy({ truncate: true }).then(() => {
            Weather.bulkCreate(data, {}).then(() => console.log('weather of cities updated'));
          });
        });
      })
      .catch((err: Error) => {
        console.error(err.message);
      });
  })
  .catch((err: Error) => {
    console.error(err.message);
  });
