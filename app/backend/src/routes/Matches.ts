import { Router } from 'express';
import MatchesController from '../controllers/Matches';

const router = Router();

const controller = new MatchesController();

router.get('/', controller.getMatches);
router.patch('/:id/finish', controller.changeToFinish);
export default router;
