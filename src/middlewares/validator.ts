import env from "@/data/env";
import { NextFunction, Request, Response } from "express";
import { header, param, validationResult } from "express-validator";

const validator = {
  protect: [
    header("authorization")
      .notEmpty()
      .withMessage("authorization header is missing")
      .isString()
      .withMessage("authorization header must be a string")
      .matches(env.API_KEY)
      .withMessage("invalid authorization key")
  ],

  getAnalyticsByNamespace: [
    param("namespace")
      .notEmpty()
      .withMessage("namespace is missing")
      .isString()
      .withMessage("namespace must be a string")
      .isAlpha()
      .withMessage("namespace must contain alphabets only")
  ],

  trackAnalytics: [
    param("namespace")
      .notEmpty()
      .withMessage("namespace is missing")
      .isString()
      .withMessage("namespace must be a string")
      .isAlpha()
      .withMessage("namespace must contain alphabets only")
  ]
};

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const _e = errors.array();
    let status = _e[0].msg.includes("authorization") ? 401 : 400;
    return res.status(status).json({ msg: _e[0].msg });
  }
  next();
};

export default validator;
