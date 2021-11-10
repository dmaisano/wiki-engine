import { Response } from "express";
import { getRepository } from "typeorm";
import { v4 } from "uuid";
import { Page } from "../entity/Page";

class PageService {
  async getPage({ slug, res }: { slug?: string; res: Response }) {
    if (typeof slug !== "string") {
      return res.sendStatus(404);
    }

    const pageRepo = getRepository(Page);

    return pageRepo.findOne({ where: { slug } });
  }

  // TODO: add method to handle image uploading
  // images will probably be saved in Filesystem
  async createPage({
    title,
    content,
    description = "",
  }: {
    title: string;
    content: string;
    description: string;
  }) {
    const pageRepo = getRepository(Page);
    const page = new Page();

    // this is redundant for a small example app (and probably not efficient in prod)
    // generates a unique primary key per page, ensuring it does not exist in the DB
    const generatePrimaryKey = async (): Promise<string> => {
      const key = v4();

      const page = await pageRepo.findOne({ where: { slug: key } });

      if (!page) {
        return key;
      } else {
        return generatePrimaryKey();
      }
    };

    page.slug = await generatePrimaryKey();
    page.content = content;
    page.title = title;
    page.description = description;

    return pageRepo.save(page);
  }
}

export default new PageService();
