import { Request, Response } from "express";

/**
 * @class SuccessResponseHandler
 */
class SuccessResponseHandler {

    /**
     * @name respond
     * @static
     * @param res 
     * @param statusCode 
     * @param message 
     * @param metaData 
     */
    static respond(res: Response, statusCode: number, message: string, metaData: object = {}) {

        res.status(statusCode).json({
            message,
            ...metaData
        });

    }

}

export default SuccessResponseHandler;