import { NotFoundError } from "../exceptions";
import express, { Request, Response } from "express";

const router = express.Router();

router.use("*", (req: Request, res: Response) => {
    throw new NotFoundError(
        `ROUTE_NOT_FOUND ${req.method} ${req.originalUrl}`
    );
});

export default router;