import { sanitizeHeaders } from "@/lib/utils";
import AnalyticsService from "@/services/anayltics";
import { NextFunction, Request, Response } from "express";

class AnalyticsController {
  static getAllAnalytics = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const analytics = await AnalyticsService.getAnalytics({});
      return res.json({ ...analytics });
    } catch (error) {
      next(error);
    }
  };

  static getAnalyticsByNamespace = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const namespace = req.params.namespace;
      const analytics = await AnalyticsService.getAnalytics({ namespace });
      return res.json({ ...analytics });
    } catch (error) {
      next(error);
    }
  };

  static track = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const headers = sanitizeHeaders(req.headers);
      if (!headers) throw new Error("No Headers To Track");
      console.log(headers);
      const { namespace } = req.params;

      await AnalyticsService.trackVisitors({ ...headers, namespace });
      return res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };
}

export default AnalyticsController;
