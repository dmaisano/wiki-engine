import path from "path";
import { Repository } from "typeorm";
import { v4 } from "uuid";
import { Page } from "../entity/Page";

export const PROJECT_ROOT_DIR: string = path.resolve(__dirname, "../../");

// this is redundant for a small example app (and probably not efficient in prod)
// generates a unique primary key / slug per page, ensuring it does not exist in the DB
export const generatePageSlug = async (
  pageRepo: Repository<Page>,
): Promise<string> => {
  const key = v4();

  // check if page slug exists
  const page = await pageRepo.findOne({ where: { slug: key } });

  if (!page) {
    return key;
  } else {
    return generatePageSlug(pageRepo);
  }
};
