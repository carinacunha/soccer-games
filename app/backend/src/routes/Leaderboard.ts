import { Router } from 'express';
import LearderController from '../controllers/Leaderboard';

const router = Router();

const controller = new LearderController();

router.get('/home', controller.getHomeLeaderboard);
router.get('/away', controller.getAwayLeaderboard);

export default router;
