import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Page } from "./Page";

@Entity()
export class PageHistory {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ nullable: true })
  description?: string; // commit description

  @Column({ type: "text", nullable: true })
  content?: string;

  @CreateDateColumn()
  archiveDate: Date;

  @Column()
  slug: string; // source slug

  @ManyToOne(() => Page, (page) => page.history)
  sourcePage: Page;
}
