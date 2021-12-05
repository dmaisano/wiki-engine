import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { UserInputError } from 'apollo-server-express';
import { AppModule } from './app.module';

/**
 * ? reference: https://docs.nestjs.com/techniques/logger
 */
export class CustomLogger extends ConsoleLogger {
  error(message: any, stack?: string, context?: string) {
    if (message === `VALIDATION_ERROR`) return;

    // add your tailored logic here
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

  const configService = app.get(ConfigService);
  const PORT = configService.get(`PORT`);

  app.useGlobalPipes(CustomValidationPipe);
  await app.listen(PORT || 3001);
}
bootstrap();
