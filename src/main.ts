// Require the framework and instantiate it

// ESM
import Fastify, { FastifyInstance } from "fastify";
import { todoRoutes } from "./interface-adapters/controllers/todo.controller";
import { MikroORM } from "@mikro-orm/postgresql";

export async function buildApp(): Promise<FastifyInstance> {
  const app = Fastify({
    logger: true,
  });

  // const orm = await MikroORM.init(mikroOrmConfig)

  // cons
  // app.register( async(instance) => {
  //   todoRoutes(instance, )
  // });


  return app;
}

const start = async () => {
  const server = await buildApp();

  try {
    server.listen({ port: 3000 }, function (err, address) {
      if (err) {
        server.log.error(err);
        process.exit(1);
      }
      // Server is now listening on ${address}
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
