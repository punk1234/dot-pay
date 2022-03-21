import K from "../constants";
import { Request, Response } from "express";

/**
 * @class SuccessResponseHandler
 */
class SuccessResponseHandler {

    /**
     * @method respond
     * @static
     * @param res 
     * @param statusCode 
     * @param message 
     * @param metaData 
     */
    static respond(res: Response, statusCode: number, message: string, metaData: object = {}) {

        res.status(statusCode).json({
            message,
            metaData
        });

    }

    /**
     * @method created
     * @static
     * @param res
     * @param message 
     * @param metaData 
     */
    static created(res: Response, message: string, metaData: object = {}) {

        this.respond(
            res,
            K.HttpStatusCode.CREATED,
            message,
            metaData
        );

    }

    /**
     * @method success
     * @static
     * @param res
     * @param message 
     * @param metaData 
     */
    static success(res: Response, message: string, metaData: object = {}) {

        this.respond(
            res,
            K.HttpStatusCode.SUCCESS,
            message,
            metaData
        );

    }

    /**
     * @method redirect
     * @static
     * @param res
     * @param url
     */
    static redirect(res: Response, url: string) {

        res.redirect(url);

    }

}

export default SuccessResponseHandler;