import { Router } from 'express';
import { reset } from '../controllers/testing.js';
const router = Router();

router.post('/reset', reset);

export default router;
