import { Router } from 'express';
import MatchesController from '../controllers/Matches';

const router = Router();

const controller = new MatchesController();

router.get('/', controller.getMatches);
export default router;
