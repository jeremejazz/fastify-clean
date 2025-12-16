import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { GetTodoById } from 'src/application/use-cases/todo/get-todo-by-id';


// Define the shape of the request parameters
interface TodoRequestParams {
    id: string;
}

// Define the shape of the response body
interface TodoResponseBody {
    id: string;
    title: string;
    description: string;
    isComplete: boolean;
}

// This controller only depends on the Use Case.
export class TodoController {
    private readonly getProductByIdUseCase: GetTodoById;

    constructor(getProductByIdUseCase: GetTodoById) {
        this.getProductByIdUseCase = getProductByIdUseCase;
    }

    // Fastify Handler signature with typed request
    public async getTodo(
        request: FastifyRequest<{ Params: TodoRequestParams }>,
        reply: FastifyReply
    ): Promise<FastifyReply> {
        try {
            const productId = request.params.id;

            // 1. Call the Use Case with clean input
            const productData = await this.getProductByIdUseCase.execute(productId);

            if (!productData) {
                return reply.code(404).send({ message: 'Product not found' });
            }

            // 2. Format the Use Case's output into a Fastify response
            const responseBody: TodoResponseBody = productData;
            return reply.send(responseBody);

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            return reply.code(400).send({ message: errorMessage });
        }
    }
}

// Function to register the route with Fastify
export function todoRoutes(fastify: FastifyInstance, controller: TodoController): void {
    fastify.route({
        method: 'GET',
        url: '/todo/:id',
        handler: controller.getTodo.bind(controller)
    });
}