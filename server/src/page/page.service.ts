import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePageInput } from './dto/create-page.input';
import { UpdatePageInput } from './dto/update-page.input';
import { Page } from './entities/page.entity';

@Injectable()
export class PageService {
  constructor(@InjectRepository(Page) private pagesRepo: Repository<Page>) {}

  async create(createPageInput: CreatePageInput): Promise<Page | null> {
    const newPage = this.pagesRepo.create(createPageInput);

    return this.pagesRepo.save(newPage);
  }

  async findAll(): Promise<Page[]> {
    return this.pagesRepo.find();
  }

  async findOne(id: number): Promise<Page | null> {
    if (typeof id !== `number`) return null;

    return this.pagesRepo.findOneOrFail(id);
  }

  async update(updatePageInput: UpdatePageInput): Promise<Page | null> {
    if (!updatePageInput.id) return null;

    return this.pagesRepo.save(updatePageInput);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.pagesRepo.delete(id);

    return typeof result.affected === `number` && result.affected > 0;
  }
}
