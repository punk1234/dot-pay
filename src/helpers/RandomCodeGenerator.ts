/**
 * @class RandomCodeGenerator
 */
class RandomCodeGenerator {

    /**
     * @method getBase62
     * @static
     * @param {number} length 
     * @returns {string}
     */
    static getBase62(length: number): string {
        if(length < 1) { throw new Error("length must be minimum of 1"); }

        let value = "";
        const BASE62_CHARS: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for(let index = 0; index < length; index++) {
            const RANDOM_CHAR_INDEX = Math.floor(Math.random() * BASE62_CHARS.length);
            value += BASE62_CHARS[RANDOM_CHAR_INDEX];
        }

        return value;
    }

}

export default RandomCodeGenerator;