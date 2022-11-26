import { Router } from 'express';
import { addToFavorites } from '../../controllers/location.controller';
import { verifyToken } from '../../services/verifyToken';

const locationRouter = Router();

locationRouter.post('/:id(\\d+)/favorite', [verifyToken], addToFavorites);

export default locationRouter;
