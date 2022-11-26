import { Response } from 'express';
import { City } from '../models/city.model';
import { User, UserCity } from '../models/user.model';
import { CustomRequest } from '../services/verifyToken';

export function addToFavorites(req: CustomRequest, res: Response) {
  const cityId = req.params.id;

  City.findByPk(cityId)
    .then((city) => {
      User.findByPk(req.user.id)
        .then(async (user) => {
          const isFavorite = await UserCity.findOne({ where: { userId: user.id, cityId: city.id } });

          if (isFavorite !== null) return res.status(200).json({ message: 'City already added!', success: false });

          const favorite = new UserCity({ userId: user.id, cityId: city.id });
          favorite.save();
          return res.status(200).json({ message: 'City added!', success: true });
        })
        .catch((err: Error) => {
          return res.status(500).json({ message: err.message, success: false });
        });
    })
    .catch((err: Error) => {
      return res.status(500).json({ message: err.message, success: false });
    });
}
