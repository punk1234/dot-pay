import K from "../constants";
import { BadRequestError } from "../exceptions";
import { NextFunction, Request, Response } from "express";
import { Result, ValidationError, validationResult } from "express-validator";

/**
 * @function RequestErrorChecker
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
const RequestErrorChecker = (req: Request, res: Response, next: NextFunction) => {
    const validationOutput: Result<ValidationError> = validationResult(req);
    
    if(validationOutput.isEmpty()) { return next(); }

    const errors: ValidationError[] = validationOutput.array({ onlyFirstError: true });
    throw new BadRequestError(K.ApiResponseMessage.ERR_BAD_REQUEST, { errors });
};

export default RequestErrorChecker;