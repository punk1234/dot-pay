import K from "../constants";
import express, { Request, Response } from "express";

const router = express.Router();

router.get("", (req: Request, res: Response) => {
    const ROOT_RESPONSE_DATA = {
        message: "Welcome to Lannister-pay service!!!"
    };

    res.status(K.HttpStatuscode.SUCCESS).json(
        ROOT_RESPONSE_DATA
    );
});

export default router;