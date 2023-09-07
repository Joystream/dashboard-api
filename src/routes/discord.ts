import { Router, Request, Response } from "express";
import { getBudgets } from "../apis/get-budgets";
import apicache from "apicache";

const router = Router();

const cache = apicache.middleware;

router.get("/", cache("1 day"), async (req: Request, res: Response) => {});

export default router;
