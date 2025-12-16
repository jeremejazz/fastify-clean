// Require the framework and instantiate it

// ESM
import Fastify, { FastifyInstance } from "fastify";

import { MikroORM } from "@mikro-orm/postgresql";
import mikroOrmConfig from '../mikro-orm.config';
import { MikroTodoRepository } from "./infrastructure/persistence/mikro-todo-repository";
import { GetTodoById } from "./application/use-cases/todo/get-todo-by-id";
import { TodoController, todoRoutes } from "./interface-adapters/controllers/todo.controller";


export async function buildApp(): Promise<FastifyInstance> {
  const app = Fastify({
    logger: true,
  });

// 1. Initialize the CONCRETE Infrastructure Client (Replaces Prisma/Mongoose initialization)
    const orm = await MikroORM.init(mikroOrmConfig);
    const em = orm.em.fork(); // Get a request-scoped EntityManage


    const todoRepository = new MikroTodoRepository(em); // <-- NEW IMPLEMENTATION

    // 3. Instantiate the Use Case (Application -> requires Domain Interface)
    const getProductByIdUseCase = new GetTodoById(todoRepository);

    // 4. Instantiate the Controller (Interface Adapters -> requires Use Case)
    const productController = new TodoController(getProductByIdUseCase);

    app.register(async (instance) => {
        todoRoutes(instance, productController);
    });

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
