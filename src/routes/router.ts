import { Router } from 'express';
import authRouter from './authRouter';
import credentialsRouter from './credentialRouter';
import securityNotesRouter from './securityNotesRouter';
import cardsRouter from './cardsRouter';
import wifisRouter from './wifisRouter';

const router = Router();
router.use(authRouter);
router.use(credentialsRouter);
router.use(securityNotesRouter);
router.use(cardsRouter);
router.use(wifisRouter);

export default router;
