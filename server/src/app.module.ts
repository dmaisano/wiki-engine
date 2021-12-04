import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloServerPluginLandingPageLocalDefault as ApolloSandbox } from 'apollo-server-core';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { __prod__ } from './constants';
import { PageModule } from './page/page.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: __prod__,
    }),
    GraphQLModule.forRoot({
      debug: false,
      playground: false,
      plugins: [ApolloSandbox()],
      autoSchemaFile: join(process.cwd(), `src/schema.gql`),
    }),
    TypeOrmModule.forRoot({
      type: `sqlite`,
      database: join(__dirname, `../data.db`),
      entities: [`dist/**/*.entity{.ts,.js}`],
      synchronize: true,
      logging: true,
    }),
    PageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
