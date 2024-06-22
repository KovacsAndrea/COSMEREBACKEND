import { ObjectId } from "mongodb";
import { Book } from "../model/book";
import { MongoBookRepo } from "../repo/mongoBookRepo";

export class MongoBookServ {
    private bookRepo: MongoBookRepo;

    constructor(bookRepo: MongoBookRepo) {
        this.bookRepo = bookRepo;
    }

    //#region BOOK VIEW
    public async getAllBooks(){
        const books = await this.bookRepo.getAllBooks();
        return books;
    }

    public async getSearchResultWithCurrentCriteria(searchText: string) {
        return await this.bookRepo.getSearchResultWithCurrentCriteria(searchText);
    }

    public async getAllBooks_Length(){
        const result = await this.bookRepo.getAllBooks_Length();
        return result;
    }
    //#endregion
    
    //#region BOOK COLLECTION 
    public async getAllBooks_Collection(){
        const books = await this.bookRepo.getAllBooks_Collection();
        return books;
    }

    async containsBook(id: string): Promise<boolean> {
        return await this.bookRepo.containsBook(id);
    }

    public async getBookById(id: string) {
        const book = await this.bookRepo.getBookById(id);
        return book;
    }

    public async getSearchResult(searchText: string) {
        return await this.bookRepo.getSearchResult(searchText);
    }

    public async addBook(book: Book) {
        const result =  await this.bookRepo.addBook(book);
        return result;
    }

    public async deleteBook(id: string) {
        const result = await this.bookRepo.deleteBook(id);
        return result;
    }

    public async updateBook(book: Book): Promise<boolean> {
        return await this.bookRepo.updateBook(book);
    }

    async getMockBook(){
        return this.bookRepo.getMockBook();
    }
    public getMockID(): ObjectId {
        return this.bookRepo.getMockID();
    }
    //#endregion

    //#region FILTER
    public async updateCurrentFilterData(planetData: any,
        systemData: any,
        shardData: any,
        dateData:any,
    ){
        const result = await this.bookRepo.updateCurrentFilterData(planetData,systemData,shardData,dateData)
        return result;
    }

    public async updateCurrentFilterPlanetData(planetData: any){
        const result = await this.bookRepo.updateCurrentPlanetData(planetData)
        return result;
    }

    public async updateCurrentFilterSystemData(systemData: any){
        const result = await this.bookRepo.updateCurrentSystemData(systemData)
        return result
    }

    public async updateCurrentFilterShardData(shardData: any){
        const result = await this.bookRepo.updateCurrentShardData(shardData)
        return result;
    }

    public async updateCurrentFilterDateData(dateData: any){
        const result = await this.bookRepo.updateCurrentDateData(dateData)
        return result
    }

    public async getCurrentFilterData(){
        const result = await this.bookRepo.getCurrentFilterData();
        return result;
    }
        
    public async getFilterData(){
        const filterData = await this.bookRepo.getFilterData();
        return filterData;
    }
    //#endregion

    //#region SORT
    public async getCurrentSortData(){
        const result = await this.bookRepo.getCurrentSortData();
        return result;
    }

    public async updateCurrentSortData(criteria: any, direction: any){
        await this.bookRepo.updateCurrentSortData(criteria, direction)
    }
    //#endregion

    //#region CHART
    public async getChartData(){
        const result = await this.bookRepo.getChartData();
        return result
    }
    //#endregion

    //#region PAGINATION
    public async updateElementsPerPage(elementsPerPage: number){
        const result = await this.bookRepo.updatePaginationData(elementsPerPage)
        return result;
    }

    public async getCurrentElementsPerPage(){
        const result = await this.bookRepo.getCurrentElementsPerPage();
        return result;
    }

    public getCurrentPage() {
        const result = this.bookRepo._currentPage
        return result
    }

    public updateCurrentPage(currentPage: number){
        this.bookRepo._currentPage = currentPage
    }
    //#endregion

    
    
    


    

    
    

    

   

    

    

    

    

    

    // public async getAllSortedBooks(filter?: any, sort?: any){
    //     return await this.bookRepo.getAllSortedBooks(filter, sort);
    // }


    
}