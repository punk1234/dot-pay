import BaseBodyValidator from "./base/BodyValidator";
import RequestErrorChecker from "../RequestErrorChecker";

/**
 * @class ShortUrlValidator
 */
class ShortUrlValidator {

    /**
     * @method checkCreateShortUrl
     * @function
     * @returns
     */
    static checkCreateShortUrl(): any[] {
        return [
            BaseBodyValidator.checkString("longUrl")
                .isURL()
                .withMessage(`Valid URL is required!!!`),
            RequestErrorChecker
        ];
    }

}

export default ShortUrlValidator;