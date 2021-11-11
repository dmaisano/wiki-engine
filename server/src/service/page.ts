import { Response } from "express";
import _ from "lodash";
import { getRepository } from "typeorm";
import { Page } from "../entity/Page";
import { PageHistory } from "../entity/PageHistory";
import { generatePageSlug } from "../utils";

class PageService {
  async getPage({ slug, res }: { slug?: string; res: Response }) {
    if (typeof slug !== "string") {
      return res.sendStatus(404);
    }

    const pageRepo = getRepository(Page);

    const page = await pageRepo.findOne({ where: { slug } });

    // handle edge case for loading the main index wiki page for the first time
    if (!page && slug === `main`) {
      const defaults: any = {
        title: `Main Page`,
        content: `# Main Page`,
        description: `Example description`,
      } as Page;

      return this.createPage(defaults, true);
    } else {
      return page;
    }
  }

  // TODO: refactor this method to 'insertOrUpdate'
  async createPage(
    {
      title,
      description = "",
      content = "",
    }: {
      title: string;
      description: string;
      content: string;
    },
    isMainPage: boolean = false,
  ) {
    const pageRepo = getRepository(Page);
    const pageHistoryRepo = getRepository(PageHistory);
    const page = new Page();

    let slug: string;
    if (isMainPage) {
      slug = `main`;
    } else {
      slug = await generatePageSlug(pageRepo);
    }
    page.slug = slug;
    page.title = title;
    page.description = description;
    page.content = content;

    try {
      // TODO: make this a SQL transaction
      const savedPage = await pageRepo.save(page);
      await pageHistoryRepo.save({
        slug,
        title,
        description,
        content,
      });

      return savedPage;
    } catch (error) {
      throw error;
    }
  }
}

export default new PageService();
