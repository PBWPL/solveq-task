import express from 'express';

import { AppDependencies } from './lib/di';
import { City } from './models/city.model';
import { User } from './models/user.model';
import rootRouter from './routes/v1';

function serverFactory(deps: AppDependencies) {
  const { sequelize, config } = deps;
  const app = express();

  const port = config.HTTP.port;

  app.use('/', rootRouter);

  sequelize
    .sync({ force: process.env.NODE_ENV === 'development' })
    .then(() => {
      console.log('Database connected');

      if (process.env.NODE_ENV === 'development') {
        const users = [
          { username: 'user1', password: 'password1' },
          { username: 'user2', password: 'password2' },
          { username: 'user3', password: 'password3' }
        ];

        users.forEach((user) => {
          const u = new User(user);
          u.save();
        });

        const cities = [
          { name: 'Poznań', coordinate: { type: 'Point', coordinates: [52.409538, 16.931992] } },
          { name: 'Gdańsk', coordinate: { type: 'Point', coordinates: [54.372158, 18.638306] } },
          { name: 'Gdynia', coordinate: { type: 'Point', coordinates: [54.372158, 18.638306] } },
          { name: 'Wrocław', coordinate: { type: 'Point', coordinates: [51.107883, 17.038538] } },
          { name: 'Kraków', coordinate: { type: 'Point', coordinates: [50.049683, 19.944544] } }
        ];

        cities.forEach((city) => {
          const c = new City(city);
          c.save();
        });

        console.log('Drop and re-sync db');
      }
    })
    .catch((err: Error) => {
      console.log('Error', err.message);
    });

  return app.listen(port, () => {
    console.log(`Run at port ${port}`);
  });
}

export default serverFactory;
