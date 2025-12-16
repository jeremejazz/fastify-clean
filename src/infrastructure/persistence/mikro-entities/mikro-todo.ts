import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({ tableName: 'todo' })
export class MikroTodo{
    @PrimaryKey()
    id!: string;

    @Property()
    title!: string;

    @Property()
    description: string;

    @Property()
    isComplete!: boolean;

}