import { EntityManager } from "@mikro-orm/postgresql";
import { Todo } from "src/domain/entities/todo";
import { TodoRepositoryInterface } from "src/domain/interfaces/todo-repository.interface";
import { MikroTodo } from "./mikro-entities/mikro-todo";

export class MikroTodoRepository implements TodoRepositoryInterface{
    private readonly em: EntityManager;

    constructor(entityManager: EntityManager){
        this.em = entityManager;
    }

    public async findById(id: string): Promise<Todo | null> {
        
        const mikroTodo = await this.em.findOne(MikroTodo, {id});

        if(!mikroTodo){
            return null;
        }
        return new Todo({
            id: mikroTodo.id,
            title: mikroTodo.title,
            description: mikroTodo.description,
            isComplete: mikroTodo.isComplete
        })
    }
}