import { DataSource } from "typeorm";
import "dotenv/config";

const { DBHOST, DBUSER, DBPASSWORD, DBDATABASE } = process.env;

const AppDataSource = new DataSource({
  type: "postgres",
  host: DBHOST,
  username: DBUSER,
  password: DBPASSWORD,
  database: DBDATABASE,
  synchronize: true,
  logging: true,
  entities: [__dirname + "/entities/*.entity.ts"],
  subscribers: [],
  ssl: true,
});

export default AppDataSource;
