import { Router } from 'express';
import { CandidateController } from '../controllers/candidate.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { saveCandidateSchema } from '../validators/candidate.validator.js';

const router = Router();

router.post(
  '/',
  validate(saveCandidateSchema),
  CandidateController.saveCandidateProfile
);

export default router;