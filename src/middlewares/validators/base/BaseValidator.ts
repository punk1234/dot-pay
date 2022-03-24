import { check, ValidationChain } from "express-validator";
import IValidationChecker from "../../../interfaces/IValidationChecker";

/**
 * @class BaseValidator
 */
class BaseValidator {

    static customCheck: IValidationChecker = check;

    /**
     * @name checkCompulsory
     * @param field 
     * @returns 
     */
    static checkCompulsory(field: string): ValidationChain {
        return this.customCheck(field)
            .exists()
            .withMessage(`${field} must be provided`);
    }

    /**
     * @name checkOptional
     * @param field 
     * @returns 
     */
    static checkOptional(field: string): ValidationChain {
        return this.customCheck(field)
            .optional();
    }

    /**
     * @name checkString
     * @param field 
     * @returns 
     */
    static checkString(field: string): ValidationChain {
        return this.checkCompulsory(field)
            .isString()
            .withMessage(`${field} must be a string`);
    }

    /**
     * @name checkStringPattern
     * @param field
     * @param pattern
     * @returns 
     */
    static checkStringPattern(field: string, pattern: string): ValidationChain {
        return this.checkOptional(field)
            .matches(pattern, "g")
            .withMessage(`${field} has an invalid format`);
    }

}

export default BaseValidator;