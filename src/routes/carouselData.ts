import { Router, Request, Response } from "express";
import { calculateSecondsUntilNext5MinuteInterval } from "../utils/utils";
import fs from "fs";
import path from "path";

const router = Router();

const CAROUSEL_DATA_PATH = path.join(__dirname, "../carousel-data.json");

router.get("/", (req: Request, res: Response) => {
  if (fs.existsSync(CAROUSEL_DATA_PATH)) {
    const carouselData = fs.readFileSync(CAROUSEL_DATA_PATH);
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.parse(carouselData.toString()));

    return;
  }

  res.setHeader("Retry-After", calculateSecondsUntilNext5MinuteInterval());
  res.status(503).send();
});

export default router;
