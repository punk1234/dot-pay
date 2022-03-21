import Root from "./Root";
import NotFound from "./NotFound";
import { Application } from "express";
import UrlShortener from "./UrlShortener";

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
        app.use(UrlShortener);
        app.use(NotFound);
    }

}