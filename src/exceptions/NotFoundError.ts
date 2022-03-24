import K from "../constants";
import CustomError from "./CustomError";

/**
 * @class NotFoundError
 */
class NotFoundError extends CustomError {

    /**
     * @constructor
     * @param message 
     * @param metaData 
     */
    constructor(message: string = K.ApiResponseMessage.ERR_NOT_FOUND, metaData: object = {}) {

        super(K.HttpStatusCode.NOT_FOUND, message, metaData);

    }

}

export default NotFoundError;