import { handleValidationErrors } from "@/middlewares/validator";
import { ValidationChain } from "express-validator";
import { lookup } from "geoip-lite";
import { IncomingHttpHeaders } from "http";
import _ from "lodash";

const headersToTrack = [
  "additional-data",
  "color-depth",
  "display-size",
  "ip-address",
  "max-touch-points",
  "pixel-depth",
  "platform-custom",
  "user-agent-custom"
];

export const sanitizeHeaders = (incomingHeaders: IncomingHttpHeaders) => {
  try {
    const keys = Object.keys(incomingHeaders);
    const headers: KeyValue[] = [];
    keys.forEach((key) => {
      if (!headersToTrack.includes(key)) return;
      const header = incomingHeaders[key] as string;
      let object = {
        key,
        value: header
      };
      headers.push(object);
    });

    return headers as KeyValue[];
  } catch (error) {
    console.log(error);
  }
};

export const searchCountry = (ip?: string) => {
  if (!ip) return "Unknown";
  const lookupData = lookup(ip);
  return lookupData ? lookupData.country : "Unknown";
};

export const transformArrayToObject = (array: KeyValue[]): TransformedObject => {
  const result: TransformedObject = {};

  array.forEach(({ key, value }) => {
    const [...keys] = key.split(":");
    _.setWith(result, [...keys], parseInt(value), Object);
  });

  return result;
};

export const attachMiddleware = (middlewares: ValidationChain[]) => {
  return [...middlewares, handleValidationErrors];
};
