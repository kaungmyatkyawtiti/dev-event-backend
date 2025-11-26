import ImageKit from "imagekit";
import { privateKey, publicKey, urlEndpoint } from "./config.ts";

console.log("privateKey", privateKey, "publicKey", publicKey, "urlEndpoint", urlEndpoint);

export const imageKit = new ImageKit({
  publicKey: publicKey,
  privateKey: privateKey,
  urlEndpoint: urlEndpoint,
});
