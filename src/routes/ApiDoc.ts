import YAML from "yamljs";
import express from "express";
import SwaggerUI from "swagger-ui-express";
const swaggerDocument = YAML.load("./spec/api-spec.yml");

const router = express.Router();

router.use(
    "/api-docs",
    SwaggerUI.serve,
    SwaggerUI.setup(swaggerDocument)
);

export default router;