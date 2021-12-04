import { Module } from '@nestjs/common';
import { PageService } from './page.service';
import { PageResolver } from './page.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Page } from './entities/page.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Page])],
  providers: [PageResolver, PageService],
})
export class PageModule {}
