import redis from "@/lib/redis";
import { searchCountry } from "@/lib/utils";

class AnalyticsService {
  static getAnalytics = async ({ namespace }: { namespace?: string }) => {
    const analytics = await redis.getAnalytics({ namespace });
    return { ...analytics };
  };

  static trackVisitors = async ({
    headers,
    namespace
  }: {
    headers: KeyValue[];
    namespace: string;
  }) => {
    const ip = headers.find((header) => header.key === "ip-address");
    const country = searchCountry(ip?.value);
    await redis.trackVisitors({
      params: [...headers, { key: "country", value: country }],
      namespace
    });
  };
}
export default AnalyticsService;
