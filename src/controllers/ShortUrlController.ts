import K from "../constants";
import { SuccessResponseHandler } from "../helpers";
import { IShortUrl } from "../database/types/IShortUrl";
import ShortUrlService from "../services/ShortUrlService";
import { NextFunction, Request, Response } from "express";

/**
 * @class ShortUrlController
 */
class ShortUrlController {

    /**
     * @name create
     * @static
     * @async
     * @param req 
     * @param res 
     * @param next
     * @returns
     */
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { longUrl } = req.body;
            const createdShortUrl: IShortUrl = await ShortUrlService.create(longUrl);
            
            SuccessResponseHandler.created(
                res,
                K.ApiResponseMessage.SUC_CREATE_SHORTENED_URL,
                {
                    shortUrl: `${req.headers.host}/${createdShortUrl.shortUrlCode}`
                }
            );
        } catch(err) {
            next(err);
        }
    }

    /**
     * @name getLongUrl
     * @static
     * @async
     * @param req 
     * @param res 
     * @param next
     * @returns
     */
    static async getLongUrl(req: Request, res: Response, next: NextFunction) {
        try {
            const { shortUrlCode } = req.params;
            const foundShortUrl: IShortUrl|null = await ShortUrlService.getByShortUrlCode(
                shortUrlCode
            );
            
            if(!foundShortUrl) {
                return res.status(K.HttpStatusCode.NOT_FOUND)
                    .send(`Invalid URL`);
            }

            SuccessResponseHandler.redirect(
                res,
                foundShortUrl.longUrl
            );
        } catch(err) {
            next(err);
        }
    }

}

export default ShortUrlController;