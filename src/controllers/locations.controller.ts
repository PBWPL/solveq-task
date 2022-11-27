import { Request, Response } from 'express';
import { City } from '../models/city.model';

export function showLocations(req: Request, res: Response) {
  City.findAll()
    .then((cities) => {
      res.status(200).json({ cities, success: true });
    })
    .catch((err: Error) => {
      return res.status(500).json({ message: err.message, success: false });
    });
}
