import AnalyticsController from "@/controllers/analytics";
import { attachMiddleware } from "@/lib/utils";
import validator from "@/middlewares/validator";
import express from "express";

const router = express.Router();

router.get("/", attachMiddleware(validator.protect), AnalyticsController.getAllAnalytics);

router.get(
  "/:namespace",
  attachMiddleware([...validator.protect, ...validator.getAnalyticsByNamespace]),
  AnalyticsController.getAnalyticsByNamespace
);

router.post(
  "/:namespace",
  attachMiddleware([...validator.protect, ...validator.trackAnalytics]),
  AnalyticsController.track
);

export default router;
