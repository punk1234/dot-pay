import Root from "./Root";
import ApiDoc from "./ApiDoc";
import NotFound from "./NotFound";
import ShortUrl from "./ShortUrl";
import { Application } from "express";

/**
 * @class RouteManager
 * @classdesc
 */
export default class RouteManager {

    /**
     * @name installRoutes
     * @param app 
     */
    static installRoutes(app: Application) {
        app.use(Root);
        app.use(ApiDoc);
        app.use(ShortUrl);
        app.use(NotFound);
    }

}