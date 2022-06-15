import express, {Request, Response, NextFunction} from 'express'
const router = express.Router();
import authControl from '../controller/auth'
const { register, login, logout } = authControl;
console.log('REACH HERE')
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);

export default router;
