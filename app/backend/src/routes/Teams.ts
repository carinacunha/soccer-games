import { Router } from 'express';
import TeamsController from '../controllers/Teams';

const router = Router();

const controller = new TeamsController();

router.get('/', controller.getAllTeams.bind(controller));
router.get('/:id', controller.getTeamsById.bind(controller));

export default router;
