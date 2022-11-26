import { Request, Response, Router } from 'express';

const locationRouter = Router();

locationRouter.post('/:id(\\d+)/favorite', (req: Request, res: Response) => {
  return res.status(200).json({ temp: `/location/${req.params.id}/favorite` });
});

export default locationRouter;
