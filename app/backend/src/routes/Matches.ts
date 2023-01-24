import { Router } from 'express';
import MatchesController from '../controllers/Matches';

const router = Router();

const controller = new MatchesController();

router.get('/', controller.getMatches);
router.post('/', controller.saveMatches);
router.patch('/:id/finish', controller.changeToFinish);
router.patch('/:id', controller.updatePoints);
export default router;
