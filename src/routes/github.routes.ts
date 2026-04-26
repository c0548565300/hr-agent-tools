import { Router } from 'express';
import { GithubController } from '../controllers/github.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { githubProfileSchema } from '../validators/github.validator.js';

const router = Router();

router.get(
  '/:username',
  validate(githubProfileSchema), 
  GithubController.getCandidateSummary
);

export default router;