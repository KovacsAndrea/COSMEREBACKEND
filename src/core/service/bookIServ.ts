import { Book } from "../model/book";

export interface BookIServ {
    useLocalData(): void;
    getAllBooks(paginationNumber: any): Book[];
    getBookById(id: string): Book|undefined;
    getBooksByTitle(searchText: string, searchSet: Book[]): Book[];
    getMockBook(id: string): Book;
    deleteBook(id: string): void;
    addBook(book: Book): void;
    updateBook(book: Book): void;
    getNewBookId(): string;
    getListofIds(): string[];
    containsBook(id: string): boolean;
    length(): number;
    updateAddData(): void;
    updateDeleteData(): void;
    sortBooks(sortCriteria: string, sortDirection: string): Book[];
}