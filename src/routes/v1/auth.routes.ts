import { Request, Response, Router } from 'express';

const authRouter = Router();

authRouter.post('/login', (req: Request, res: Response) => {
  return res.status(200).json({ temp: '/auth/login' });
});

export default authRouter;
