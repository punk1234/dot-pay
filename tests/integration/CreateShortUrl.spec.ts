import request from "supertest";
import K from "../../src/constants";
import { Application } from "express";
import config from "../../src/config";
import UrlMock from "../__mocks__/UrlMock";
import AppLoader from "../__helpers__/AppLoader";
import ShortUrlService from "../../src/services/ShortUrlService";
import { RandomCodeGenerator } from "../../src/helpers";

let app: Application, requestSpy: any;

describe("POST /urls/short", () => {

    beforeEach(async () => {
        app = await AppLoader.load();
        requestSpy = jest.spyOn(RandomCodeGenerator, "getBase62");
    });

    afterEach(async () => {
        await AppLoader.unload();
        requestSpy?.mockRestore();
    });

    it("[201] - Create short url", async () => {
        const longUrl = UrlMock.getValidLongUrl();
        const res = await request(app)
            .post(`/urls/short`)
            .send({ longUrl })
            .expect(K.HttpStatusCode.CREATED);

        expect(res.body.metaData.shortUrl).toBeDefined();
    });

    it("[201] - Create short url with longUrl that already exists", async () => {
        const longUrl = UrlMock.getValidLongUrl();

        const shortUrlObject = await ShortUrlService.create(longUrl);

        const res = await request(app)
            .post(`/urls/short`)
            .send({ longUrl })
            .expect(K.HttpStatusCode.CREATED);

        const shortUrl = res.body.metaData.shortUrl;
        expect(shortUrl.substr(shortUrl.length - config.SHORT_URL_CODE_LENGTH))
            .toEqual(shortUrlObject.shortUrlCode);
    });

    it("[400] - Create short url with empty request body", async () => {
        const res = await request(app)
            .post(`/urls/short`)
            .send({})
            .expect(K.HttpStatusCode.BAD_REQUEST);

        expect(res.body.errors).toBeDefined();
    });

    it("[400] - Create short url with invalid url", async () => {
        const longUrl = UrlMock.getInvalidUrl();
        const res = await request(app)
            .post(`/urls/short`)
            .send({ longUrl })
            .expect(K.HttpStatusCode.BAD_REQUEST);

        expect(res.body.errors).toBeDefined();
    });

    it("[500] - Create short url with used short-codes", async () => {
        const longUrl = UrlMock.getValidLongUrl();
        const shortUrlObject = await ShortUrlService.create(longUrl);

        requestSpy.mockReturnValue(shortUrlObject.shortUrlCode);
        const res = await request(app)
            .post(`/urls/short`)
            .send({ longUrl: UrlMock.getSecondValidLongUrl() })
            .expect(K.HttpStatusCode.SERVER_ERROR);

        const errMsg = res.body.message;
        expect(errMsg).toEqual("Error occured. Try again!!!");

        // RandomCodeGenerator.getBase62(...) was called once successful, reason for +1
        expect(RandomCodeGenerator.getBase62).toHaveBeenCalledTimes(config.SHORT_URL_CODE_MAX_RETRY + 1);
    });

});