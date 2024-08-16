import "module-alias/register";

import env from "@/data/env";
import createServer from "@/lib/server";

const app = createServer();

app.listen(env.PORT, () => {
  console.log(`Server Running on :${env.PORT}`);
});
