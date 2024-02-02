import { Router } from 'express';
const router = Router();

import {
  createPatient,
  getAllPatients,
  getSinglePatient,
} from '../controllers/patients';
import { createEntry } from '../controllers/entries';

router.route('/').get(getAllPatients).post(createPatient);
router.route('/:id').get(getSinglePatient);
router.route('/:id/entries').post(createEntry);

export default router;
