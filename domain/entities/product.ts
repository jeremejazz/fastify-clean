
export default class Product{
    id: number;
    name: string;
    price: number;
    
    constructor(id: number, name: string, price: number){
        if(!id || !name || !price){
            throw new Error("Product must have ID, Name, and Price");
        }

        this.id = id;
        this.name = name;
        this.price = price;
    }
}