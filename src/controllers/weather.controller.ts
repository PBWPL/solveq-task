import { Response } from 'express';
import { City } from '../models/city.model';
import { User } from '../models/user.model';
import { Weather } from '../models/weather.model';
import { CustomRequest } from '../services/verifyToken';

export function showWeather(req: CustomRequest, res: Response) {
  User.findByPk(req.user.id, { include: City })
    .then(async (user) => {
      if (user.cities.length === 0) return res.status(500).json({ message: 'No favourite cities!', success: false });

      const data = user.cities.map((city) => {
        return Weather.findOne({ where: { cityId: city.id } }).then((weather) => JSON.parse(weather.rawData));
      });

      Promise.all(data)
        .then((weather) => {
          return res.status(200).json({ weather, success: true });
        })
        .catch((err: Error) => {
          return res.status(500).json({ message: err.message, success: false });
        });
    })
    .catch((err: Error) => {
      return res.status(500).json({ message: err.message, success: false });
    });
}
