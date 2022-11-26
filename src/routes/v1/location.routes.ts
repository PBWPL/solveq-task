import { Request, Response, Router } from 'express';
import { verifyToken } from '../../services/verifyToken';

const locationRouter = Router();

locationRouter.post('/:id(\\d+)/favorite', [verifyToken], (req: Request, res: Response) => {
  return res.status(200).json({ temp: `/location/${req.params.id}/favorite` });
});

export default locationRouter;
