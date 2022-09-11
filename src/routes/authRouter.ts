import { Router } from "express";
import { createUser, login } from "../controllers/authController";
import { validateSchemaMiddleware } from "../middlewares/validateSchema";
import { authSchema } from "../schemas/authSchema";

const authRouter = Router();

authRouter.post('/login', validateSchemaMiddleware(authSchema), login);
authRouter.post('/signup', validateSchemaMiddleware(authSchema), createUser);

export default authRouter;
