import { Router } from 'express';
import authRouter from './authRouter';
import credentialsRouter from './credentialRouter';
import securityNotesRouter from './securityNotesRouter';

const router = Router();
router.use(authRouter);
router.use(credentialsRouter);
router.use(securityNotesRouter);

export default router;
