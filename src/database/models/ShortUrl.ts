import  { model, Schema } from "mongoose";
import { IShortUrl } from "../types/IShortUrl";

const ShortUrlSchema =  new Schema({
    shortUrlCode: {
        type: "string",
        required: true,
        unique: true
    },
    longUrl: {
        type: "string",
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
}, {
    toJSON: {
        transform: function (doc: any, ret: any) {
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});

export default model<IShortUrl>("short_url", ShortUrlSchema);