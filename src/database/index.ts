import { DataSource } from "typeorm";
import config from "../config/db";
import { Logger } from "../utils/logger";
import {} from "./models";

export class DbConnection {
  private static _instance: DbConnection;
  private logger = new Logger();
  private static dbConnection = new DataSource({
    type: config.type,
    logging: false,
    synchronize: false,
    host: config.host,
    port: Number(config.port as string),
    username: config.username,
    password: config.password,
    database: config.name,
    migrations: [__dirname + "/migrations/"],
    entities: [__dirname + "/models/*{.js,.ts}"],
    options: {
      encrypt: false,
    },
  });

  private constructor() {}

  public static get instance(): DbConnection {
    if (!this._instance) this._instance = new DbConnection();

    return this._instance;
  }

  public static get connection(): DataSource {
    return this.dbConnection;
  }

  initializeDb = async () => {
    try {
      const connection = await DbConnection.dbConnection.initialize();
      this.logger.log("db-connection " + connection.options.database);
      console.log("==connection==>", connection.options.database);
    } catch (error) {
      this.logger.error(`db-error: ${error}`);
      console.log({ error });
    }
  };

  disconnectDb = async () => {
    try {
      await DbConnection.dbConnection.destroy();
    } catch (error) {
      const log = "db-disconnection-error" + error;
      this.logger.error(log);
    }
  };
}

const dbConnection = DbConnection.connection;

export default dbConnection;
