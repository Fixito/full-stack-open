import { Router } from 'express';
import { createUser, getAllUsers } from '../controllers/users.js';
const router = Router();

router.route('/').post(createUser).get(getAllUsers);

export default router;
