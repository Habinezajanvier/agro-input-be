// import { CardStatus } from "./config/constant";

declare type DbType = "mysql" | "postgres" | "mssql";

declare type envData = {
  username?: string;
  password?: string;
  host?: string;
  port?: string;
  name?: string;
  type: DbType;
};
