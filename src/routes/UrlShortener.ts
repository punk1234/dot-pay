import express from "express";
import ShortenedUrlController from "../controllers/ShortenedUrlController";
import ShortenedUrlValidator from "../middlewares/validators/ShortenedUrlValidator";

const router = express.Router();

router.post(
    "/urls/short",
    // ShortenedUrlValidator.checkCreateShortUrl(),
    // ShortenedUrlController.createShortUrl
);

export default router;