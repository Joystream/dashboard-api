import apicache from "apicache";
import { Router, Request, Response } from "express";
import getPrice from "../apis/get-price";

const router = Router();

const cache = apicache.middleware;

router.get("/", cache("10 minutes"), async (req: Request, res: Response) => {
  let price = await getPrice();
  res.setHeader("Content-Type", "application/json");
  res.send(price);
});

export default router;
