import Root from "./Root";
import NotFound from "./NotFound";
import { Application } from "express";
import ShortUrl from "./ShortUrl";

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
        app.use(ShortUrl);
        app.use(NotFound);
    }

}