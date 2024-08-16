import dotenv from "dotenv";
dotenv.config();
export default {
  REDIS_URI: process.env.REDIS_URI as string,
  API_KEY: process.env.API_KEY as string,
  PORT: process.env.PORT || "5000"
};
