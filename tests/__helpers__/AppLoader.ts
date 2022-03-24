import App from "../../src/App";
import express, { Application } from "express";
import { MongoMemoryServer } from "mongodb-memory-server";
import MongoDbConnector from "../../src/database/connectors/MongoDbConnector";

class AppLoader {

    static appHolder: App;
    static dbServer: MongoMemoryServer;

    static async load(): Promise<Application> {
        const dbUrl: string = await this.getTestDbUrl();
        this.appHolder = new App(express(), Number(7001));

        const dbConnector: MongoDbConnector = new MongoDbConnector();
        await dbConnector.connect(dbUrl);

        await this.appHolder.configure();
        return this.appHolder.engine;
    }

    static async unload(): Promise<void> {
        await MongoDbConnector.getClient().disconnect();
        await this.dbServer.stop();
    }

    static async getTestDbUrl(): Promise<string> {
        this.dbServer = await MongoMemoryServer.create();
        return this.dbServer.getUri();
    }

}

export default AppLoader;