import crypto from "crypto";
const SALT = "sAruQ44A0jDbw0gr";

export function encryptPassword(password: string) {
    return crypto.pbkdf2Sync(password, SALT, 1000, 64, `sha512`).toString(`hex`);
}