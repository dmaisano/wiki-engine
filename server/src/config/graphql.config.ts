import { ConfigModule, ConfigService } from '@nestjs/config';
import { GqlModuleAsyncOptions } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault as ApolloSandbox } from 'apollo-server-core';
import { GraphQLFormattedError } from 'graphql';
import { join } from 'path';
import { EnvironmentVariables } from '../types';

export const graphqlConfigAsync: GqlModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService<EnvironmentVariables>) => ({
    debug: false,
    playground: false,
    plugins: configService.get(`IS_PROD`) ? [] : [ApolloSandbox()],
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
  inject: [ConfigService],
};
