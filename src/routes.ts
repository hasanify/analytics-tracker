import anaylticsRoutes from "@/routes/analytics";
import { Application } from "express";

const useRoutes = (app: Application) => {
  app.use("/", anaylticsRoutes);
};

export default useRoutes;
