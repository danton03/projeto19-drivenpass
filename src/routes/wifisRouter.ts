import { Router } from "express";
import { createWifi, deleteWifi, getWifis } from "../controllers/wifisController";
import { validateSchemaMiddleware } from "../middlewares/validateSchema";
import { wifiSchema } from "../schemas/wifiSchema";

const wifisRouter = Router();

wifisRouter.post("/wifis",validateSchemaMiddleware(wifiSchema), createWifi);
wifisRouter.get("/wifis", getWifis)
wifisRouter.delete("/wifis/:id",deleteWifi)

export default wifisRouter;