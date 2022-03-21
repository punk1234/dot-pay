import { param } from "express-validator";
import BaseValidator from "./BaseValidator";
import { IValidationChecker } from "../../../interfaces";

/**
 * @class ParamValidator
 */
class ParamValidator extends BaseValidator {

    static customCheck: IValidationChecker = param;

}

export default ParamValidator;