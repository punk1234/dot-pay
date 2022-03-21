import config from "../config";
import ShortUrl from "../database/models/ShortUrl";
import { IShortUrl } from "../database/types/IShortUrl";
import { ServerError } from "../exceptions";
import { RandomCodeGenerator } from "../helpers";

/**
 * @class ShortUrlService
 */
class ShortUrlService {

    /**
     * @method create
     * @static
     * @async
     * @param {string} longUrl 
     * @returns {IShortUrl}
     */
    static async create(longUrl: string): Promise<IShortUrl> {
        const foundShortUrl = await this.getByLongUrl(longUrl);
        if(foundShortUrl) { return foundShortUrl; }

        const SHORT_URL_CODE = await this.getRandomShortUrlCode();
        
        const shortUrl = new ShortUrl({
            shortUrlCode: SHORT_URL_CODE,
            longUrl
        });

        return shortUrl.save();
    }

    /**
     * @method getByShortUrlCode
     * @static
     * @async
     * @param {string} shortUrlCode 
     * @returns {Promise<IShortUrl|null>}
     */
    static async getByShortUrlCode(shortUrlCode: string): Promise<IShortUrl|null> {
        return ShortUrl.findOne(
            { shortUrlCode }
        );
    }

    /**
     * @method getByLongUrl
     * @static
     * @async
     * @param {string} longUrl 
     * @returns {Promise<IShortUrl|null>}
     */
    private static async getByLongUrl(longUrl: string): Promise<IShortUrl|null> {
        return ShortUrl.findOne(
            { longUrl }
        );
    }

    /**
     * @method getRandomShortUrlCode
     * @static
     * @async
     * @returns {Promise<string>}
     */
    private static async getRandomShortUrlCode(): Promise<string> {
        let retriesLeft: number = config.SHORT_URL_CODE_MAX_RETRY;

        while(retriesLeft > 0) {
            const SHORT_URL_CODE = RandomCodeGenerator.getBase62(
                config.SHORT_URL_CODE_LENGTH
            );

            const foundShortUrl = await this.getByShortUrlCode(SHORT_URL_CODE);
            if(!foundShortUrl) { return SHORT_URL_CODE; }

            retriesLeft--;
        }

        throw new ServerError("Error occured. Try again!!!");
    }

}

export default ShortUrlService;