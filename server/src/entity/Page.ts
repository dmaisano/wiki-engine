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

  @OneToMany(() => PageHistory, (historyEntry) => historyEntry.sourcePage, {
    eager: true, // include relations on fetch
    onDelete: `CASCADE`,
  })
  history: PageHistory[];
}
