export interface TodoProps{
    id: string;
    title: string;
    description: string;
    isComplete: boolean;
}


export class Todo implements TodoProps{
    public readonly id: string;
    public title: string;
    public description: string;
    public isComplete: boolean;

    constructor({id, title, description, isComplete}: TodoProps){
        this.id = id;
        this.title = title;
        this.description = description;
        this.isComplete = isComplete;
    }
}