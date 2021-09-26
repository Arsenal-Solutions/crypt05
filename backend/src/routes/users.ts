import express from 'express';
import {createUser, login, getUserByAddress, transfer} from '../controllers/users';

const router = express.Router();

router.post('/', createUser);
router.post('/login', login);
router.get('/:address', getUserByAddress);
router.post('/transfer', transfer)

export default router;