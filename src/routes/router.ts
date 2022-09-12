import { Router } from 'express';
import authRouter from './authRouter';
import credentialsRouter from './credentialRouter';
import securityNotesRouter from './securityNotesRouter';
import cardsRouter from './cardsRouter';

const router = Router();
router.use(authRouter);
router.use(credentialsRouter);
router.use(securityNotesRouter);
router.use(cardsRouter);

export default router;
