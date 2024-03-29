import knexInit, { Knex } from "knex";
import { PGUSER, PGHOST, PGDATABASE, PGPASSWORD, PGPORT } from "../config";

export const knex: Knex = knexInit({
  client: "pg",
  connection: {
    host: PGHOST,
    port: Number(PGPORT),
    user: PGUSER,
    password: PGPASSWORD,
    database: PGDATABASE,
  },
  migrations: {
    tableName: "migrations",
    extension: "ts",
  },
});
