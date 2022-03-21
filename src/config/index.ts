import dotenv from "dotenv";
import K from "../constants";

dotenv.config();

const { env } = process;

export default {
    SHORT_URL_CODE_LENGTH: 8,
    APP_PORT: env.PORT || 5000,
    DATABASE_URL: env.MONGODB_URL || "",
    ENVIRONMENT: env.NODE_ENV || K.Environment.DEVELOPMENT,
    SHORT_URL_CODE_MAX_RETRY: Number(env.SHORT_URL_CODE_MAX_RETRY) || 3,
};