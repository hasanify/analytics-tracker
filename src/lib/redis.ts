import client from "@/configs/redis";
import { transformArrayToObject } from "./utils";

const trackVisitors = async ({ params, namespace }: { params: KeyValue[]; namespace: string }) => {
  const base = `${namespace}:visitors`;
  const promises: Promise<number>[] = [];

  params.forEach((param) => {
    const key = `${base}:${param.key}:${param.value}`;
    promises.push(client.incrby(key, 1));
  });
  promises.push(client.incrby(`${base}:total`, 1));
  await Promise.allSettled(promises);
};

const getAnalytics = async ({ namespace = "" }: { namespace?: string }) => {
  namespace += "*";
  const keys = await client.keys(namespace);
  const analytics: KeyValue[] = [];

  for await (const key of keys) {
    analytics.push({
      key: key,
      value: (await client.get(key)) || "0"
    });
  }

  return transformArrayToObject(analytics);
};

export default {
  trackVisitors,
  getAnalytics
};
