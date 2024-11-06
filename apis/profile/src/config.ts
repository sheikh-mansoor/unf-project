import { UnfBaseConfig } from "@unf/node-common";
import convict from "convict";
import "dotenv/config";

export interface AppConfig extends UnfBaseConfig {}

const schema: convict.Schema<AppConfig> = {
  graphql: {
    port: {
      default: 80,
      doc: "The port to listen to.",
      env: "PORT",
      format: Number,
    },
    serviceName: {
      default: null,
      doc: "The name of the service.",
      env: "SERVICE_NAME",
      format: String,
    },
  },
  isDebug: {
    default: false,
    doc: "Turns on debug mode items when true.",
    env: "IS_DEBUG",
    format: Boolean,
  },
  prisma: {
    dbUrl: {
      default: null,
      doc: "The connection string for the database.",
      env: "DATABASE_URL",
      format: String,
      sensitive: true,
    },
  },
};

const validatedConfig = convict(schema).validate({ allowed: "strict" });
export const config = validatedConfig.getProperties();
console.info({ config: JSON.parse(validatedConfig.toString()) });
