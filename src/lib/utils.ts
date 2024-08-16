import { handleValidationErrors } from "@/middlewares/validator";
import { ValidationChain } from "express-validator";
import { lookup } from "geoip-lite";
import { IncomingHttpHeaders } from "http";
import _ from "lodash";

export const sanitizeHeaders = (headers: IncomingHttpHeaders) => {
  try {
    let ip = headers["x-forwarded-for"] as string | undefined;
    let platform = headers["sec-ch-ua-platform"] as string;
    if (!platform) platform = "Unknown";
    platform = platform.replace(/"|\\/g, "");

    let agent = headers["user-agent"] as string;
    if (!agent) agent = "Unknown";
    agent = agent.replace(/"|\\/g, "");

    return { ip, platform, agent };
  } catch (error) {
    console.log(error);
  }
};

export const searchCountry = (ip?: string) => {
  if (!ip) return "Unknown";
  return lookup(ip)!.country || "Unknown";
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
