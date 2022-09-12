import { Request, Response } from "express";
import { TCard } from "../types/cardTypes";
import { createCardService, deleteCardService, getCardsService } from "../services/cardsServices";

export async function createCard(req:Request, res:Response) {
  const cardData: TCard = req.body;
  const token = req.headers["authorization"];
  await createCardService(cardData, token);
  res.sendStatus(201);
}

export async function getCards(req:Request, res:Response) {
  const token = req.headers["authorization"];
  const cardId = req.query.id;
  const cards = await getCardsService(cardId, token);
  res.send(cards).status(200);
}

export async function deleteCard(req:Request, res:Response) {
  const token = req.headers["authorization"];
  const cardId = Number(req.params.id);
  await deleteCardService(cardId, token);
  return res.sendStatus(200);
}