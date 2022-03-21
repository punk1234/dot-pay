import dotenv from "dotenv";
import K from "../constants";

dotenv.config();

export default {
    SHORT_URL_CODE_LENGTH: 8,
    APP_PORT: process.env.PORT || 5000,
    DATABASE_URL: process.env.MONGODB_URL || "",
    ENVIRONMENT: process.env.NODE_ENV || K.Environment.DEVELOPMENT
};