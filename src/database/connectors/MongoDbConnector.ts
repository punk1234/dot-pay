import mongoose from "mongoose";
import IDatabaseConnector from "../../interfaces/IDatabaseConnector";

/**
 * @class MongoDbConnector
 */
export default class MongoDbConnector implements IDatabaseConnector {

    protected static client: any;

    /**
     * @name getClient
     * @static
     * @returns 
     */
     static getClient() {
        return this.client;
    }
    
    /**
     * @name connect
     * @param url
     * @desc connects to mongodb database
     */
    async connect(url: string) {
        MongoDbConnector.client = await mongoose.connect(url);
    }

    /**
     * @name disconnect
     * @desc disconnects from mongodb database
     */
    async disconnect() {
        await MongoDbConnector.client.close();
    }

}