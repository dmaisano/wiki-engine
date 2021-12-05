import { Field, InputType } from '@nestjs/graphql';
import {
  IsAlphanumeric,
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Match } from '../../validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsAlphanumeric()
  username: string;

  @IsEmail(
    {},
    {
      message: `invalid email`,
    },
  )
  @Field()
  email: string;

  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/, {
    message:
      'password must contain at least one lowercase letter, one uppercase letter, and one number',
  })
  @MinLength(8, {
    message: `password must be at least 8 characters long`,
  })
  @MaxLength(32, {
    message: `password cannot be longer than 32 characters`,
  })
  @Field()
  password: string;

  @Match((x: CreateUserInput) => x.password, {
    message: `passwords do not match`,
  })
  @Field()
  confirmPassword: string;
}
