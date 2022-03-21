import K from "../constants";
import CustomError from "../exceptions/CustomError";
import { NextFunction, Request, Response } from "express";


const GlobalErrorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    const statusCode: number = err.statusCode || K.HttpStatusCode.SERVER_ERROR;
    const message: string = err.message || K.ApiResponseMessage.ERR_SERVER;
    const metaData: object = err.metaData || {};
    
    res.status(statusCode).send({ message, ...metaData });
};

export default GlobalErrorHandler;