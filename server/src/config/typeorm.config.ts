import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { PROJECT_ROOT_DIR } from '../constants';
import { EnvironmentVariables } from '../types';

export const typeormConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService<EnvironmentVariables>) => ({
    type: `postgres`,
    ssl: configService.get(`IS_PROD`)
      ? {
          rejectUnauthorized: false,
        }
      : false,
    url: configService.get(`DB_URL`),
    entities: [`${PROJECT_ROOT_DIR}/dist/**/*.entity{.ts,.js}`],
    synchronize: true,
    logging: true,
  }),
  inject: [ConfigService],
};
