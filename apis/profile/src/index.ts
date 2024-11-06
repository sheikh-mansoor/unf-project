import { config } from "./config.js";
import { builder } from "./graphql/builder.js";
import { createGraphQLServer, startGraphQLServer } from "./graphql/index.js";

// importing schema files builds it as side-effects
import "./graphql/schema/query.js";

const server = createGraphQLServer(builder, config.isDebug);
startGraphQLServer({ config, server });
