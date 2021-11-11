import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { PageHistory } from "./PageHistory";

@Entity()
export class Page {
  @PrimaryColumn({ unique: true, nullable: false })
  slug!: string;

  @Column()
  title!: string;

  @Column({ nullable: true })
  description?: string; // commit description

  @Column({ type: "text", nullable: true })
  content?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // ? could make this eager fetch if I want to always have the page history fetched with each page
  @OneToMany(() => PageHistory, (historyEntry) => historyEntry.sourcePage, {
    eager: false,
    onDelete: `CASCADE`,
  })
  history: PageHistory[];
}
