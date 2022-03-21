import K from "../constants";
import express, { Request, Response } from "express";
import { SuccessResponseHandler } from "../helpers";

const router = express.Router();

router.get("", (req: Request, res: Response) => {

    SuccessResponseHandler.success(
        res,
        "Welcome to Dot-pay service!!!"
    );

});

export default router;