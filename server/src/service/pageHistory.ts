import _ from "lodash";
import { getRepository } from "typeorm";
import { PageHistory } from "../entity/PageHistory";

class PageHistoryService {
  async getHistory(slug: string): Promise<PageHistory[]> {
    slug = slug.trim();

    const pageHistoryRepo = getRepository(PageHistory);
    return pageHistoryRepo.find({ where: { slug } });
  }

  async getPageArchive({ slug, id }: { slug: string; id: number }) {
    slug = _.kebabCase(slug);
    const pageHistoryRepo = getRepository(PageHistory);

    return pageHistoryRepo
      .createQueryBuilder(`archive`)
      .innerJoinAndSelect(`archive.sourcePage`, `page`)
      .where(`archive.slug = :slug AND archive.id = :id`, { slug, id })
      .getOne();
  }
}

export default new PageHistoryService();
