import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
@ObjectType()
export class Page {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  title: string;

  @Column({ nullable: true })
  @Field({ nullable: true, description: `Commit description` })
  description?: string;

  @Column({ type: 'text', nullable: true })
  @Field({ nullable: true, description: `Markdown content` })
  content?: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;

  @Column({ nullable: false })
  @Field(() => Int)
  creatorId: number;

  @ManyToOne(() => User, (user) => user.pages, {
    onDelete: `CASCADE`,
  })
  @JoinColumn({ name: `creatorId` })
  @Field()
  creator: User;
}
