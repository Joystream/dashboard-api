import { Router, Request, Response } from "express";
import { getStatus } from "src/apis/get-status";
import apicache from "apicache";

const router = Router();

const cache = apicache.middleware;
router.get("/", cache("1 hour"), async (req: Request, res: Response) => {
  let status = await getStatus();
  res.setHeader("Content-Type", "application/json");
  res.send(status);
});

export default router;
