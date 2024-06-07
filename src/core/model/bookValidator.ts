import { REGEX } from "../dummyData/regex";
import { Book } from "./book";

export class BookValidator {

    public isValidIdForNewBook(id: string, listOfIds: string[]): boolean {
        return REGEX.id.test(id) && !listOfIds.includes(id);
    }

    public isValidContentForNewBook(content:string): boolean {
        return REGEX.content.test(content)
    }

    public isValidStartDateForNewBook(content: string): boolean {
        return REGEX.startDate.test(content) 
    }

    public isValidNewBook(book: Book, listOfIds: string[]): boolean {
        return this.isValidIdForNewBook(book._id.toString(), listOfIds) &&
        this.isValidContentForNewBook(book._title) &&
        this.isValidContentForNewBook(book._description) &&
        this.isValidContentForNewBook(book._planet) &&
        this.isValidContentForNewBook(book._system) &&
        this.isValidContentForNewBook(book._shard) &&
        this.isValidStartDateForNewBook(book._startDate.toString())
    }
}