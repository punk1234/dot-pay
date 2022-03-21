import dotenv from "dotenv";
import K from "../constants";

dotenv.config();

export default {
    ENVIRONMENT: process.env.NODE_ENV || K.Environment.DEVELOPMENT,
    APP_PORT: process.env.PORT || 5000,
};