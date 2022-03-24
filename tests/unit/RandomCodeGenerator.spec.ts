import { RandomCodeGenerator } from "../../src/helpers";

describe("Random Code Generator", () => {

    it("[PASS] Get Random code with a valid specified length", async () => {
        const LENGTH = 100;
        const randomCode = RandomCodeGenerator.getBase62(LENGTH);
        expect(randomCode.length).toEqual(LENGTH);
    });

    it("[PASS] Get Random code with a valid minimum length", async () => {
        const LENGTH = 1;
        const randomCode = RandomCodeGenerator.getBase62(LENGTH);
        expect(randomCode.length).toEqual(LENGTH);
    });

    it("[FAIL] Get Random code with an invalid (negative number) specified length", async () => {
        const LENGTH = -12;
        expect(() => RandomCodeGenerator.getBase62(LENGTH))
            .toThrow("length must be minimum of 1");
    });

    it("[FAIL] Get Random code with an invalid (boundary) less than minimum length", async () => {
        const LENGTH = 0;
        expect(() => RandomCodeGenerator.getBase62(LENGTH))
            .toThrow("length must be minimum of 1");
    });

});