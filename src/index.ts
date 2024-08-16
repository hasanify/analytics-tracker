import "module-alias/register";

import env from "@/data/env";
import createServer from "@/lib/server";
import { readFileSync } from "fs";
import { join } from "path";

const app = createServer();

app.listen(env.PORT, () => {
  const packageJsonPath = join(__dirname, "..", "package.json");
  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
  console.log("--------------------------------------------");
  console.log(`Started v${packageJson.version}! 🚀`);
  console.log("--------------------------------------------");

  console.log(`Server Running on :${env.PORT}`);
});
