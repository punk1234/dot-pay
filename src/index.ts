import App from "./App";
import config from "./config";
import express from "express";
// import MongoDbConnector from "./database/connectors/MongoDbConnector";
// import RedisConnector from "./database/connectors/RedisConnector";

/********************************************************
 * APPLICATION MAIN
 ********************************************************/

const main = async () => {
    const app = new App(
        express(),
        Number(config.APP_PORT)
    );

    // const dbConnector: MongoDbConnector = new MongoDbConnector();
    // await dbConnector.connect(config.DATABASE_URL);

    // const redisConnector: RedisConnector = new RedisConnector();
    // await redisConnector.connect(config.REDIS_URL);

    await app.configure();
    app.run();
};

/********************************************************
 * RUN APPLICATION
 ********************************************************/

main();