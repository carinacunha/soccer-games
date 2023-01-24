import { Router } from 'express';
import MatchesController from '../controllers/Matches';
import validationAuth from '../middlewares/Auth';

const router = Router();

const controller = new MatchesController();

router.get('/', controller.getMatches);
router.post('/', validationAuth, controller.saveMatches);
router.patch('/:id/finish', controller.changeToFinish);
router.patch('/:id', controller.updatePoints);
export default router;
