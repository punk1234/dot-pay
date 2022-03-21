import { body } from "express-validator";
import BaseValidator from "./BaseValidator";
import { IValidationChecker } from "../../../interfaces";

/**
 * @class BodyValidator
 */
class BodyValidator extends BaseValidator {

    static customCheck: IValidationChecker = body;

}

export default BodyValidator;