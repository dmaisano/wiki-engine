import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Page {
  @PrimaryColumn({ unique: true })
  slug!: string;

  @Column()
  title!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: "text" })
  content: string;
}
