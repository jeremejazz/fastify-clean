import { TodoProps } from "src/domain/entities/todo";
import { TodoRepositoryInterface } from "src/domain/interfaces/todo-repository.interface";

export class GetTodoById{
    private readonly todoRepository: TodoRepositoryInterface

    constructor(todoRepository: TodoRepositoryInterface){
        this.todoRepository = todoRepository;
    }

    public async execute(id: string): Promise <TodoProps| null>{

        if(!id){
            throw new Error("Todo ID is required");
        }

        const todo = await this.todoRepository.findById(id);
        if(!todo){
            return null;
        }

        return {
            id: todo.id,
            title: todo.title,
            description: todo.description,
            isComplete: todo.isComplete
        };
    }

}