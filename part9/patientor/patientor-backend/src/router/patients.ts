import { Router } from 'express';
const router = Router();

import { createPatient, getAllPatients } from '../controllers/patients';

router.route('/').get(getAllPatients).post(createPatient);

export default router;
