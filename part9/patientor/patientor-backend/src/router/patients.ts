import { Router } from 'express';
const router = Router();

import { getAllPatients } from '../controllers/patients';

router.route('/').get(getAllPatients);

export default router;
