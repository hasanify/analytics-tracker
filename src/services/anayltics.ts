import redis from "@/lib/redis";
import { searchCountry } from "@/lib/utils";

class AnalyticsService {
  static getAnalytics = async ({ namespace }: { namespace?: string }) => {
    const analytics = await redis.getAnalytics({ namespace });
    return { ...analytics };
  };

  static trackVisitors = async ({
    ip,
    platform,
    agent,
    namespace
  }: {
    ip?: string;
    platform: string;
    agent: string;
    namespace: string;
  }) => {
    const country = searchCountry(ip);
    await redis.trackVisitors({
      params: [
        {
          key: "country",
          value: country
        },
        {
          key: "platform",
          value: platform
        },
        {
          key: "agent",
          value: agent
        }
      ],
      namespace
    });
  };
}
export default AnalyticsService;
