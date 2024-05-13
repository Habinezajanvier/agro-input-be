import app from "./app";
import { config } from "dotenv";
import { DbConnection } from "./database";
import "reflect-metadata";

config();
const PORT = process.env.PORT ?? 3000;

(async () => {
  await DbConnection.instance.initializeDb();
  app.listen(PORT, () => console.log(`App is up and listening to ${PORT}`));
})();
