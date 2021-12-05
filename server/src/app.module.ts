import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloServerPluginLandingPageLocalDefault as ApolloSandbox } from 'apollo-server-core';
import { GraphQLFormattedError } from 'graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { __prod__ } from './constants';
import { PageModule } from './page/page.module';
import { UserModule } from './user/user.module';

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
      formatError: (error) => {
        if (error.message === 'VALIDATION_ERROR') {
          const extensions = {
            code: 'VALIDATION_ERROR',
            errors: [],
          };

          Object.keys(error.extensions.invalidArgs).forEach((key) => {
            const constraints = [];
            Object.keys(error.extensions.invalidArgs[key].constraints).forEach(
              (_key) => {
                constraints.push(
                  error.extensions.invalidArgs[key].constraints[_key],
                );
              },
            );

            extensions.errors.push({
              field: error.extensions.invalidArgs[key].property,
              errors: constraints,
            });
          });

          const graphQLFormattedError: GraphQLFormattedError = {
            message: 'VALIDATION_ERROR',
            extensions: extensions,
          };

          return graphQLFormattedError;
        } else {
          return error;
        }
      },
    }),
    TypeOrmModule.forRoot({
      type: `sqlite`,
      database: join(__dirname, `../data.db`),
      entities: [`dist/**/*.entity{.ts,.js}`],
      synchronize: true,
      logging: true,
    }),
    PageModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
