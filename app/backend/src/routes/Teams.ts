import { Router } from 'express';
import TeamsController from '../controllers/Teams';

const router = Router();

const controller = new TeamsController();

router.get('/', controller.getAllTeams.bind(controller));

export default router;
