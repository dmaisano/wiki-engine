import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePageInput {
  @Field()
  title: string;

  @Field({ nullable: true, description: `Commit description` })
  description?: string;

  @Field({ nullable: true, description: `Markdown content` })
  content?: string;
}
