import { handleValidationErrors } from "@/middlewares/validator";
import { ValidationChain } from "express-validator";
import { lookup } from "geoip-lite";
import { IncomingHttpHeaders } from "http";
import _ from "lodash";

export const sanitizeHeaders = (incomingHeaders: IncomingHttpHeaders) => {
  try {
    const keys = Object.keys(incomingHeaders);
    const headers: KeyValue[] = [];
    keys.forEach((key) => {
      const header = incomingHeaders[key];
      if (typeof header !== "string") return;
      let object: KeyValue = {
        key,
        value: header
      };
      if (key !== "x-forwarded-for") object.value = object.value.replace(/"|\\/g, "");
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
