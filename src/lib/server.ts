import useRoutes from "@/routes";
import cors from "cors";
import express, { Application, NextFunction, Request, Response, json } from "express";

const createServer = () => {
  const app: Application = express();

  app.use(json({ limit: "5mb" }));
  app.use(cors());
  useRoutes(app);

  app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
  });

  return app;
};

export default createServer;
