import { ApolloServer, ApolloServerPlugin, BaseContext } from "@apollo/server";
import { ApolloServerPluginLandingPageDisabled } from "@apollo/server/plugin/disabled";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { startStandaloneServer } from "@apollo/server/standalone";
import { SchemaTypes } from "@pothos/core";
import { UnfBaseConfig } from "@unf/node-common";
import { GraphQLError, GraphQLFormattedError } from "graphql";

// TODO: pull out into common package

/**
 * This will create and setup an Apollo Server instance.
 *
 * @param schema The pothos schema object.
 * @param isDebug When true the server is configured to run in debug mode.
 */
export function createGraphQLServer<T extends SchemaTypes>(
  schema: PothosSchemaTypes.SchemaBuilder<T>,
  isDebug: boolean,
) {
  // Set the plugins for the landing page based on being in Debug or not.
  const plugins: ApolloServerPlugin<BaseContext>[] = [];
  if (isDebug) {
    plugins.push(ApolloServerPluginLandingPageLocalDefault());
  } else {
    plugins.push(ApolloServerPluginLandingPageDisabled());
  }

  // Create the apollo server.
  return new ApolloServer({
    allowBatchedHttpRequests: true,
    formatError: (error: GraphQLFormattedError) => {
      console.error(error);
      return new GraphQLError(error.message);
    },
    includeStacktraceInErrorResponses: isDebug,
    introspection: isDebug,
    plugins,
    schema: schema.toSchema(),
  });
}

type UpdateContext<C extends UnfBaseConfig> = (
  context: unknown,
) => Promise<C> | C;
export interface StartGraphQLServerArgs<C extends UnfBaseConfig> {
  config: UnfBaseConfig;
  server: ApolloServer;
  updateContext?: UpdateContext<C>;
}

/**
 * This will start running an Apollo Server instance.
 *
 * @param config The configuration needed to start the server.
 */
export async function startGraphQLServer<C extends UnfBaseConfig>(
  args: StartGraphQLServerArgs<C>,
) {
  const { config, server } = args;

  // Start listening to incoming requests.
  const { url } = await startStandaloneServer(server, {
    listen: { port: config.graphql.port },
  });

  console.info(`🚀 Server ready at ${url}`);
}
