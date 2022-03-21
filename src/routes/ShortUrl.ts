import express from "express";
import ShortUrlController from "../controllers/ShortUrlController";
import ShortUrlValidator from "../middlewares/validators/ShortUrlValidator";

const router = express.Router();

router.post(
    "/urls/short",
    ShortUrlValidator.checkCreateShortUrl(),
    ShortUrlController.create
);

export default router;