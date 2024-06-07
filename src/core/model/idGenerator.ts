import { Book } from "./book";

export class IdGenerator {
    public getNewBookId(listOfBooks: Book[]): string {
        let listOfIds = listOfBooks.map(book => parseInt(book._id.toString()));
        listOfIds.sort((a, b) => a - b); 

        let newId = 1; 
        for (const id of listOfIds) {
            if (id === newId) {
                    newId++;
            } else {
                return newId.toString();
            }
        }
        return newId.toString();
    }
}