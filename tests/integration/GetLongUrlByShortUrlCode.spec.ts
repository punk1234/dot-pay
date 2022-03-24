import request from "supertest";
import K from "../../src/constants";
import { Application } from "express";
import UrlMock from "../__mocks__/UrlMock";
import AppLoader from "../__helpers__/AppLoader";
import { RandomCodeGenerator } from "../../src/helpers";
import ShortUrlService from "../../src/services/ShortUrlService";

let app: Application, requestSpy: any;

describe("GET /:shortUrlCode", () => {

    beforeEach(async () => {
        app = await AppLoader.load();
        requestSpy = jest.spyOn(RandomCodeGenerator, "getBase62");
    });

    afterEach(async () => {
        await AppLoader.unload();
        requestSpy?.mockRestore();
    });

    it("[200] - Get long url using shortUrlCode", async () => {
        const longUrl = UrlMock.getValidLongUrl();
        const shortUrlObject = await ShortUrlService.create(longUrl);

        const res = await request(app)
            .get(`/${shortUrlObject.shortUrlCode}`)
            .send({})
            .expect(K.HttpStatusCode.REDIRECT);

        expect(res.headers.location).toEqual(longUrl);
    });

    it("[400] - Get long url using non-base62 shortUrlCode", async () => {
        const shortUrlCode = "abcd-123";

        const res = await request(app)
            .get(`/${shortUrlCode}`)
            .send({})
            .expect(K.HttpStatusCode.BAD_REQUEST);

        expect(res.body.errors).toBeDefined();
    });

    it("[404] - Get long url using valid shortUrlCode format but does not exist", async () => {
        const shortUrlCode = "abcd1234";

        const res = await request(app)
            .get(`/${shortUrlCode}`)
            .send({})
            .expect(K.HttpStatusCode.NOT_FOUND);
        
        expect(res.text).toEqual("Invalid URL");
    });

});