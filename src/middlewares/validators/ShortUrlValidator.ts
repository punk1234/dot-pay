import BaseBodyValidator from "./base/BodyValidator";
import RequestErrorChecker from "../RequestErrorChecker";
import ParamValidator from "./base/PathValidator";

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

    /**
     * @method checkGetLongUrl
     * @function
     * @returns
     */
     static checkGetLongUrl(): any[] {
        return [
            ParamValidator.checkString("shortUrlCode"),
            RequestErrorChecker
        ];
    }

}

export default ShortUrlValidator;