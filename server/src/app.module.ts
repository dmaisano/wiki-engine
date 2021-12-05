import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { graphqlConfigAsync } from './config/graphql.config';
import { typeormConfigAsync } from './config/typeorm.config';
import { __prod__ } from './constants';
import { PageModule } from './page/page.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: __prod__,
      load: [configuration],
    }),
    GraphQLModule.forRootAsync(graphqlConfigAsync),
    TypeOrmModule.forRootAsync(typeormConfigAsync),
    PageModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
