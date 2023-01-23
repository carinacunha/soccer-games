import { Router } from 'express';
import MatchesController from '../controllers/Matches';

const router = Router();

const controller = new MatchesController();

router.get('/', controller.getMatches.bind(controller));
// router.get('/:id', controller.getMatchesById.bind(controller));
export default router;
