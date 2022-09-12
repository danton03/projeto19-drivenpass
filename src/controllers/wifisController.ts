import { Request, Response } from "express";
import { TCreateWifi } from "../types/wifiTypes";
import { createWifiService, deleteWifiService, getWifisService } from "../services/wifisServices";

export async function createWifi(req:Request, res:Response) {
  const wifiData: TCreateWifi = req.body;
  const token = req.headers["authorization"];
  await createWifiService(wifiData, token);
  res.sendStatus(201);
}

export async function getWifis(req:Request, res:Response) {
  const token = req.headers["authorization"];
  const wifiId = req.query.id;
  const wifis = await getWifisService(wifiId, token);
  res.send(wifis).status(200);
}

export async function deleteWifi(req:Request, res:Response) {
  const token = req.headers["authorization"];
  const wifiId = Number(req.params.id);
  await deleteWifiService(wifiId, token);
  return res.sendStatus(200);
}