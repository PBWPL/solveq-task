import { Request, Response } from 'express';
import { User } from '../models/user.model';
import jwt from 'jsonwebtoken';
import config from '../config/config';

export function login(req: Request, res: Response) {
  if (!req.body.username || !req.body.password) return res.status(400).json({ message: 'Bad Request!', token: null });

  User.findOne({ where: { username: req.body.username } })
    .then((user) => {
      if (!user || !isValidPassword(user.password, req.body.password))
        return res.status(401).json({ message: 'User not found or Invalid password!', token: null });

      return res.status(200).json({ message: 'Authentication successful!', token: generateToken(user) });
    })
    .catch((err: Error) => {
      return res.status(500).json({ message: err.message, token: null });
    });
}

const isValidPassword = (pass_one: string, pass_two: string): boolean => (pass_one === pass_two ? true : false);

const generateToken = (user: User): string => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username
    },
    config.JWT.secret,
    {
      expiresIn: config.JWT.expiration
    }
  );
};
