import { Router, Request, Response } from "express";
import { calculateSecondsUntilNext5MinuteInterval } from "../utils/utils";
import path from "path";
import fs from "fs";

const router = Router();

const TOTAL_SUPPLY_DATA_PATH = path.join(
  __dirname,
  "../total-supply-data.json"
);

router.get("/test", (req: Request, res: Response) => {
  if (fs.existsSync(TOTAL_SUPPLY_DATA_PATH)) {
    const totalSupplyData = fs.readFileSync(TOTAL_SUPPLY_DATA_PATH);
    res.setHeader("Content-Type", "text/plain");
    const { totalSupply } = JSON.parse(totalSupplyData.toString());
    res.send(`${totalSupply}`).end();

    return;
  }

  res.setHeader("Retry-After", calculateSecondsUntilNext5MinuteInterval());
  res.status(503).send();
});

export default router;
