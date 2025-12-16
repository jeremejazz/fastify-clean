import { Todo } from "../entities/todo";

export interface TodoRepositoryInterface{
    findById(id: string): Promise<Todo | null>;
}