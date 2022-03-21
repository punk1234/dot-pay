import { Document } from "mongoose";

export interface IShortUrl extends Document {
    _id: string;
    shortUrlCode: string;
    longUrl: string;
    createdAt: Date;
}