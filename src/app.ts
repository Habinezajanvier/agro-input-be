import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import routes from "./routes";
import { Logger } from "./utils/logger";

const app: Express = express();

// Middlewares
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
morgan.token("type", function (req: Request) {
  return req.headers["content-type"];
});
app.use(morgan("combined", { stream: new Logger().logStream }));

app.use("/api/v1", routes);

app.all("*", (_req: Request, res: Response) => {
  return res.status(404).json({ error: true, message: "No route found" });
});

export default app;
