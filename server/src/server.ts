import express from "express";
import path from "path";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { Page } from "./entity/Page";
import router from "./routes";
import { appDir } from "./utils";

const main = async () => {
  const app = express();
  app.use(express.json());

  const conn = await createConnection({
    type: `sqlite`,
    database: `${appDir}/database.sqlite`,
    synchronize: true,
    logging: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [Page],
  });
  await conn.runMigrations();

  app.use(router);

  const port = 3001;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
};

main().catch(console.error);
