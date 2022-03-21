import K from "../constants";
import CustomError from "./CustomError";

/**
 * @class ServerError
 */
 class ServerError extends CustomError {

    /**
     * @constructor
     * @param message 
     * @param metaData 
     */
    constructor(message: string = K.ApiResponseMessage.ERR_SERVER, metaData: object = {}) {

        super(K.HttpStatuscode.SERVER_ERROR, message, metaData);

    }

}

export default ServerError;