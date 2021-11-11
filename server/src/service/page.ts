import { Response } from "express";
import _ from "lodash";
import { getConnection, getRepository } from "typeorm";
import { Page } from "../entity/Page";
import { PageHistory } from "../entity/PageHistory";

class PageService {
  async getPage({ slug, res }: { slug?: string; res: Response }) {
    if (typeof slug !== "string") {
      return res.sendStatus(404);
    }

    const pageRepo = getRepository(Page);

    const page = await pageRepo.findOne({ where: { slug } });

    // handle edge case for loading the main index wiki page for the first time
    if (!page && slug === `main`) {
      try {
        const defaults: any = {
          slug: `main`,
          title: `Main Page`,
          content: `# Heading 1\n## Heading 2\n### Heading 3\n#### Heading 4\n##### Heading 5\n###### Heading 6\n\`\`\`js\nconsole.log("hello world");\n\`\`\`\nSome random text`,
          description: `first commit`,
        } as Page;

        return this.insertOrUpdatePage(defaults);
      } catch (error) {
        throw error;
      }
    } else {
      return page;
    }
  }

  async insertOrUpdatePage({
    title,
    description = "",
    content = "",
    slug,
  }: {
    slug: string;
    title: string;
    description: string;
    content: string;
  }): Promise<Page | null> {
    try {
      slug = _.kebabCase(slug);

      console.log({ slug });

      const pageEntity = await getConnection().manager.transaction<Page>(
        async (entityManager) => {
          const result = await entityManager.save(Page, {
            slug,
            title,
            description,
            content,
          });
          await entityManager.insert(PageHistory, {
            slug,
            title,
            description,
            content,
            // sourcePage: result,
          });
          return result;
        },
      );

      return pageEntity;
    } catch (error) {
      throw error;
    }
  }
}

export default new PageService();
