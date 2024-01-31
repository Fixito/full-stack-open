import { Router } from 'express';
const router = Router();

import { getAllDiagnoses } from '../controllers/diagnoses';

router.route('/').get(getAllDiagnoses);

export default router;
