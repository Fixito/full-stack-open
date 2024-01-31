import { Router } from 'express';
import {
  createUser,
  getAllUsers,
  getSingleUser,
} from '../controllers/users.js';
const router = Router();

router.route('/').post(createUser).get(getAllUsers);
router.route(':id').get(getSingleUser);
export default router;
