import { Router } from "express";
import { createSecurityNote, deleteSecurityNote, getSecurityNotes } from "../controllers/securityNotesController";
import { validateSchemaMiddleware } from "../middlewares/validateSchema";
import { securityNoteSchema } from "../schemas/securityNoteSchema";
const securityNotesRouter = Router();

securityNotesRouter.post("/securitynotes", validateSchemaMiddleware(securityNoteSchema), createSecurityNote);
securityNotesRouter.get("/securitynotes",getSecurityNotes);
securityNotesRouter.delete("/securitynotes/:id",deleteSecurityNote);

export default securityNotesRouter;