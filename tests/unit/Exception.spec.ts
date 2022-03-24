import { BadRequestError, NotFoundError, ServerError } from "../../src/exceptions";

describe("Random Code Generator", () => {

    it("[FAIL] Bad request error", async () => {
        expect(() => { throw new BadRequestError("bad-request"); })
            .toThrow("bad-request");
    });

    it("[FAIL] Not found error", async () => {
        expect(() => { throw new NotFoundError("not-found-request"); })
            .toThrow("not-found-request");
    });

    it("[FAIL] Server error", async () => {
        expect(() => { throw new ServerError("server-error"); })
            .toThrow("server-error");
    });

});