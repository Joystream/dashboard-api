import fs from "fs";
import { Router, Request, Response } from "express";
import { calculateSecondsUntilNext5MinuteInterval } from "../utils/utils";
import path from "path";

const router = Router();

const CIRCULATING_SUPPLY_DATA_PATH = path.join(
  __dirname,
  "../circulating-supply-data.json"
);

router.get("/", (req: Request, res: Response) => {
  if (fs.existsSync(CIRCULATING_SUPPLY_DATA_PATH)) {
    const circulatingSupplyData = fs.readFileSync(CIRCULATING_SUPPLY_DATA_PATH);
    res.setHeader("Content-Type", "text/plain");
    const { circulatingSupply } = JSON.parse(circulatingSupplyData.toString());
    res.send(`${circulatingSupply}`).end();

    return;
  }

  res.setHeader("Retry-After", calculateSecondsUntilNext5MinuteInterval());
  res.status(503).send();
});

export default router;
