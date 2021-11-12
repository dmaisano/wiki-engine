import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";
import { existsSync, mkdirSync } from "fs";
import path from "path";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { Page } from "./entity/Page";
import { PageHistory } from "./entity/PageHistory";
import router from "./routes";
import { IMAGES_DIR, PROJECT_ROOT_DIR, SERVER_PORT } from "./utils";

const main = async () => {
  // create images directory if not exists
  if (!existsSync(IMAGES_DIR)) {
    mkdirSync(IMAGES_DIR, { recursive: true });
  }

  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(
    fileUpload({
      limits: { fileSize: 5242880 }, // 5mb
    }),
  );
  app.use(`/static`, express.static(`${PROJECT_ROOT_DIR}/static`));

  const conn = await createConnection({
    type: `sqlite`,
    database: `${PROJECT_ROOT_DIR}/data/database.sqlite`,
    synchronize: true,
    logging: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [Page, PageHistory],
  });
  await conn.runMigrations();

  app.use(router);

  app.listen(SERVER_PORT, () => {
    console.log(`Server running on http://localhost:${SERVER_PORT}`);
  });
};

main().catch(console.error);
