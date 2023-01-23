import { Router } from 'express';
import TeamsController from '../controllers/Teams';

const router = Router();

const controller = new TeamsController();

router.get('/', controller.getAllTeams);
router.get('/:id', controller.getTeamsById);

export default router;
