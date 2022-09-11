import { Router } from "express";
import { createCredential, deleteCredential, getCredentials } from "../controllers/credentialController";
import { validateSchemaMiddleware } from "../middlewares/validateSchema";
import { credentialSchema } from "../schemas/credentialSchema";

const credentialRouter = Router();

credentialRouter.post('/credentials', validateSchemaMiddleware(credentialSchema), createCredential);
credentialRouter.get('/credentials/', getCredentials);
credentialRouter.delete('/credentials/:id', deleteCredential);

export default credentialRouter;