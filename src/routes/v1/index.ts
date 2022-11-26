import Router, { Request, Response } from 'express';
import authRouter from './auth.routes';
import locationRouter from './location.routes';

const rootRouter = Router();

rootRouter.use('/auth', authRouter);
rootRouter.use('/location', locationRouter);

rootRouter.get('/locations', (req: Request, res: Response) => {
  res.status(200).json({ temp: '/locations' });
});

rootRouter.get('/weather', (req: Request, res: Response) => {
  res.status(200).json({ temp: '/weather' });
});

rootRouter.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Server is running!', success: true });
});

// catch 404
rootRouter.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Not found!' });
});

export default rootRouter;
