import dotenv from "dotenv";
import { DbType, envData } from "../types";
dotenv.config();

const env = process.env.NODE_ENV || "development";

console.log("====here is the environment===>", process.env.NODE_ENV);
console.log("===env variables===>", {
  username: process.env.DB_USER_DEV,
  password: process.env.DB_PASS_DEV,
  host: process.env.DB_HOST_DEV,
  port: process.env.DB_PORT_DEV,
  name: process.env.DB_NAME_DEV,
});

const development = {
  username: process.env.DB_USER_DEV,
  password: process.env.DB_PASS_DEV,
  host: process.env.DB_HOST_DEV,
  port: process.env.DB_PORT_DEV,
  name: process.env.DB_NAME_DEV,
  type: (process.env.DB_TYPE_DEV as DbType) || "postgres",
};
const test = {
  username: process.env.DB_USER_TEST,
  password: process.env.DB_PASSWORD_TEST,
  host: process.env.DB_HOST_TEST,
  port: process.env.DB_PORT_TEST,
  name: process.env.DB_NAME_TEST,
  type: (process.env.DB_TYPE_DEV as DbType) || "postgres",
};
const staging = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  name: process.env.DB_NAME,
  type: (process.env.DB_TYPE as DbType) || "postgres",
};
const production = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  name: process.env.DB_NAME,
  type: (process.env.DB_TYPE as DbType) || "postgres",
};

const config: {
  [key: string]: envData;
} = {
  development,
  test,
  staging,
  production,
};

export default config[env];
