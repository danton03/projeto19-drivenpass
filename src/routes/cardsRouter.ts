import { Router } from "express";
import { createCard, deleteCard, getCards } from "../controllers/cardsController";
import { validateSchemaMiddleware } from "../middlewares/validateSchema";
import { cardSchema } from "../schemas/cardSchema";
const cardsRouter = Router();

cardsRouter.post("/cards",validateSchemaMiddleware(cardSchema), createCard);
cardsRouter.get("/cards", getCards)
cardsRouter.delete("/cards/:id",deleteCard)

export default cardsRouter;