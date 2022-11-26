import config from '../config/config';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { User } from '../models/user.model';

export interface CustomRequest extends Request {
  user: User;
  params: any;
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  let token = req.headers.authorization || req.body.token;

  if (!token) return res.status(403).json({ message: 'No token provided!' });

  token = token.split(' ')[1];

  jwt.verify(token, config.JWT.secret, (err: Error) => {
    if (err) return res.status(401).json({ message: 'Unauthorized!' });

    (req as CustomRequest).user = jwt.decode(token) as User;
    next();
  });
}
