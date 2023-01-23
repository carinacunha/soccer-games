import { Router } from 'express';
import validationAuth from '../middlewares/Auth';
import loginValidation from '../middlewares/loginValidation';
import LoginController from '../controllers/Login';

const router = Router();
const controller = new LoginController();

router.get('/validate', validationAuth, controller.validateTypeUser);
router.post('/', loginValidation, controller.login);

export default router;
