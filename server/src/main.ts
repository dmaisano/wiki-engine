import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { UserInputError } from 'apollo-server-express';
import { AppModule } from './app.module';
import { EnvironmentVariables } from './types';

/**
 * ? reference: https://docs.nestjs.com/techniques/logger
 */
export class CustomLogger extends ConsoleLogger {
  error(message: any, stack?: string, context?: string) {
    if (message === `VALIDATION_ERROR`) return;

    super.error(message, stack, context);
  }
}

/**
 * ? reference: https://github.com/nestjs/graphql/issues/1053#issuecomment-786972617
 */
export const CustomValidationPipe = new ValidationPipe({
  transform: true,
  exceptionFactory: (errors) => {
    return new UserInputError('VALIDATION_ERROR', {
      invalidArgs: errors,
    });
  },
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new CustomLogger(),
  });

  const configService: ConfigService<EnvironmentVariables> =
    app.get(ConfigService);

  // I was hoping Nest would cast the types to match "EnvironmentVariables"
  const PORT = configService.get(`PORT`);

  app.useGlobalPipes(CustomValidationPipe);
  await app.listen(PORT);
}
bootstrap();
