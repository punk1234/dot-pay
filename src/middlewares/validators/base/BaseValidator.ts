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
     * @name checkStringOptional
     * @param field 
     * @returns 
     */
    static checkStringOptional(field: string): ValidationChain {
        return this.checkOptional(field)
            .isString()
            .withMessage(`${field} must be a string`);
    }

    /**
     * @name checkBoolean
     * @param field 
     * @returns 
     */
    static checkBoolean(field: string): ValidationChain {
        return this.checkCompulsory(field)
            .isBoolean()
            .withMessage(`${field} must be either true or false`);
    }

    /**
     * @name checkBooleanOptional
     * @param field 
     * @returns 
     */
    static checkBooleanOptional(field: string): ValidationChain {
        return this.checkOptional(field)
            .isBoolean()
            .withMessage(`${field} must be either true or false`);
    }

    /**
     * @name checkUUID
     * @param field 
     * @returns 
     */
    static checkUUID(field: string) {
        return this.checkCompulsory(field)
            .isUUID()
            .withMessage(`${field} must be a valid UUID`);
    }

    /**
     * @name checkUUIDOptional
     * @param field 
     * @returns 
     */
    static checkUUIDOptional(field: string) {
        return this.checkOptional(field)
            .isUUID()
            .withMessage(`${field} must be a valid UUID`);
    }

    /**
     * @name checkEmail
     * @param field 
     * @returns 
     */
     static checkEmail(field: string) {
        return this.checkCompulsory(field)
            .isEmail()
            .withMessage(`${field} must be a valid email`);
    }

    /**
     * @name checkStringOfDigitsWithLength
     * @param field 
     * @param length 
     * @returns 
     */
    static checkStringOfDigitsWithLength(field: string, length: number) {
        return this.checkString(field)
            .isLength({min: length, max: length})
            .withMessage(`${field} length must be ${length}`)
            .isNumeric()
            .withMessage(`${field} must contain only numbers`);
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