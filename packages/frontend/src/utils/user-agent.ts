import {UAParser} from "ua-parser-js";
import hash from "object-hash";

const uaParser = new UAParser();
export const uaHash = hash(uaParser.getUA());
