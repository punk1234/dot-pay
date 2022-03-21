import config from "../config";
import ShortUrl from "../database/models/ShortUrl";
import { IShortUrl } from "../database/types/IShortUrl";
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

        const SHORT_URL_CODE = RandomCodeGenerator.getBase62(
            config.SHORT_URL_CODE_LENGTH
        );

        const shortUrl = new ShortUrl({
            shortUrlCode: SHORT_URL_CODE,
            longUrl
        });

        return shortUrl.save();
    }

    /**
     * @method getByLongUrl
     * @static
     * @async
     * @param longUrl 
     * @returns {Promise<IShortUrl|null>}
     */
    private static async getByLongUrl(longUrl: string): Promise<IShortUrl|null> {
        return ShortUrl.findOne(
            { longUrl }
        );
    }

}

export default ShortUrlService;