export interface UnfBaseConfig {
  graphql: GraphQLConfig;
  isDebug: boolean;
  prisma: PrismaConfig;
}

export interface PrismaConfig {
  dbUrl: string;
}

export interface GraphQLConfig {
  port: number;
  serviceName: string;
}
