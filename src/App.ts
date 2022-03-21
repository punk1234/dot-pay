import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import RouteManager from "./routes";
import compression from "compression";
import { LoggerStream } from "./helpers";
import express, { Application } from "express";
import GlobalErrorHandler from "./middlewares/GlobalErrorHandler";
import MongoDbConnector from "./database/connectors/MongoDbConnector";

/**
 * @class App
 * @classdesc Application
 */
export default class App {

    engine: Application;
    PORT: number;
    static DEFAULT_PORT = 5000;
    serverConn: any;

    /**
     * @constructor
     * @param engine
     * @param PORT
     * @param dbUrl
     */
    constructor(engine: Application, PORT: number|undefined) {
        this.engine = engine;
        this.PORT = PORT || App.DEFAULT_PORT;
    }

    /**
     * @name configure
     * @function
     */
    async configure(): Promise<void> {
        // await this.checkDependencies();

        this.engine.use(cors());
        this.engine.use(helmet());
        this.engine.use(compression());
        this.engine.use(express.json());
        this.engine.use(express.urlencoded({ extended: false }));
        this.engine.use(morgan('combined', { stream: LoggerStream}));

        this.setupRoutes();
        this.engine.use(GlobalErrorHandler);
    }

    /**
     * @name setupRoutes
     * @function
     */
    private setupRoutes() {
        RouteManager.installRoutes(this.engine);
    }

    /**
     * @name checkDependencies
     * @function
     */
    private async checkDependencies() {
        // await this.checkRedisConnection();
        await this.checkDatabaseConnection();
    }

    /**
     * @name checkDatabaseConnection
     * @function
     */
    private async checkDatabaseConnection() {
        if(!MongoDbConnector.getClient()) { throw new Error("Initialize DB!!!"); }
    }

    // /**
    //  * @name checkRedisConnection
    //  * @function
    //  */
    // private async checkRedisConnection() {
    //     if(!RedisConnector.getClient()) { throw new Error("Initialize Redis!!!"); }
    // }

    /**
     * @name run
     * @function
     * @description Runs the application
     */
    run() {
        this.serverConn = this.engine.listen(this.PORT, () => {
            console.log(`App now running on port ${this.PORT}`);
        });
    }
    
    /**
     * @name close
     * @function
     * @description Close/stop running application
     */
    close() {
        this.serverConn.close();
    }

}