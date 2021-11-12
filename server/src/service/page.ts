import { Response } from "express";
import _, { isEmpty } from "lodash";
import { getConnection, getRepository } from "typeorm";
import { Page } from "../entity/Page";
import { PageHistory } from "../entity/PageHistory";

class PageService {
  async searchPages(text: string): Promise<Page[]> {
    text = `%${text.trim()}%`;

    try {
      const pageRepo = getRepository(Page);

      // fetch all pages that contain case-insensitive substring of the search text on the specified fields
      return pageRepo.query(
        `
        SELECT p.*
        FROM PAGE p
        WHERE p.slug LIKE $1
          OR p.title LIKE $1
          OR p.description LIKE $1
          OR p.content LIKE $1
       `,
        [text],
      ) as Promise<Page[]>;
    } catch (error) {
      console.error({ search_pages_error: error });
    }

    return [];
  }

  /*
  ? An optional thing I could have done was to make create a table, something like "links". I would store all the links there, create a join table and set up a relation on the page table by parsing the markdown content, and creating associations for all the relevant links contained on that page. This approach would lead to less HTTP calls being made to the server. For this small demo application I did not see the need to over engineer it and make it more complex than it needed to be.
  */
  async getSlug(slug?: string): Promise<boolean> {
    if (!slug) {
      return false;
    }

    slug = _.kebabCase(slug);
    const query_result = (await getConnection().query(
      `
      SELECT "slug"
      FROM "page"
      WHERE "slug" = $1
      limit 1
      `,
      [slug],
    )) as any[];

    if (isEmpty(query_result)) {
      return false;
    }

    return true;
  }

  async getPage(slug: string) {
    slug = _.kebabCase(slug);
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
