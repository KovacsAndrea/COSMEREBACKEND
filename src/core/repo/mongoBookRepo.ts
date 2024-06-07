import { ObjectId } from "mongodb";
import { collections, currentFilterID, filterDataID, paginationDataID, currentSortID  } from "../../../database.service";
import { Book } from "../model/book";
import randomColor from 'randomcolor'
// import { DataRepo } from "./dataRepo";
// import { StatisticsRepo } from "./statisticsRepo";

export class MongoBookRepo {

    public _currentPage = 1;

    constructor(){
        //this.handleSortFilterViewChanges();
    }

    //#region BOOKVIEW
    public async updateSortedFilteredView(filter: any, sort: any) {
        await collections.books?.aggregate([
            { $match: filter },
            { $sort: sort},
            { $out: "COSMERE_EDITED_BOOKS" } // Store the sorted and filtered result in a separate collection
        ]).toArray();
    }

    //something in the book list was added or deleted
    //so we need to recompute the filter list
    //because stuff has changed 
    public async handleSortFilterViewCRUD(){
        await this.updateFilterData();
        const filter = await this.getCurrentFilter();
        const sort = await this.getCurrentSort();
        await this.updateSortedFilteredView(filter, sort);
    }


    //no changes were made to the original book list
    //only sort and filter changed
    //so we don't need to redo the filter 
    private async handleSortFilterViewR(){
        const filter = await this.getCurrentFilter();
        const sort = await this.getCurrentSort();
        await this.updateSortedFilteredView(filter, sort);
    }

    //#endregion BOOKVIEW
    
    //#region FILTER
    public async updateFilterData() {
        //updates the sets of planets systems shards dates
        const planetData = await collections.books?.aggregate([
            { $group: { _id: "$_planet", count: { $sum: 1 } } }
        ]).toArray();
    
        const systemData = await collections.books?.aggregate([
            { $group: { _id: "$_system", count: { $sum: 1 } } }
        ]).toArray();
    
        const shardData = await collections.books?.aggregate([
            { $group: { _id: "$_shard", count: { $sum: 1 } } }
        ]).toArray();
    
        const dateData = await collections.books?.aggregate([
            { $group: { _id: "$_startDate", count: { $sum: 1 } } }
        ]).toArray();
        
        await collections.filterCriteria?.updateOne(
            { _id: filterDataID },
            { $set: { 
                planets: planetData, 
                systems: systemData, 
                shards: shardData, 
                dates: dateData } },
            { upsert: true }
        );
    }

    // private getRandomColor(): string {
    //     return '#' + Math.floor(Math.random() * 16777215).toString(16);
    // }
    

    //update the current filter criteria
    //TODO: add filter as parameter
    public async updateCurrentFilterData(
        planetData: any,
        systemData: any,
        shardData: any,
        dateData: any
    ){
        const result = await collections.filterCriteria?.updateOne(
            { _id: currentFilterID },
            { $set: { 
                planets: planetData, 
                systems: systemData, 
                shards: shardData, 
                dates: dateData } },
            { upsert: true }
        );
        await this.handleSortFilterViewR();
        return result;
    }

    public async updateCurrentPlanetData(planetData: any) {
        const result = await collections.filterCriteria?.updateOne(
            { _id: currentFilterID },
            { $set: { planets: planetData } },
            { upsert: true }
        );
        await this.handleSortFilterViewR();
        return result;
    }
    
    public async updateCurrentSystemData(systemData: any) {
        const result = await collections.filterCriteria?.updateOne(
            { _id: currentFilterID },
            { $set: { systems: systemData } },
            { upsert: true }
        );
        await this.handleSortFilterViewR();
        return result 
    }
    
    public async updateCurrentShardData(shardData: any) {
        const result = await collections.filterCriteria?.updateOne(
            { _id: currentFilterID },
            { $set: { shards: shardData } },
            { upsert: true }
        );
        await this.handleSortFilterViewR();
        return result;
    }
    
    public async updateCurrentDateData(dateData: any) {
        const result = await collections.filterCriteria?.updateOne(
            { _id: currentFilterID },
            { $set: { dates: dateData } },
            { upsert: true }
        );
        await this.handleSortFilterViewR();
        return result;
    }

    //get and format the current filter data from DB 
    private async getCurrentFilter(){
        const currentFilterData = await collections.filterCriteria?.findOne({_id: new ObjectId('6632b3f2ab6702d69f7d0ca3')})
        const planetFilterData = currentFilterData?.planets;
        const systemFilterData = currentFilterData?.systems;
        const shardFilterData = currentFilterData?.shards;
        const dateFilterData = currentFilterData?.dates;

        const filterConditions = [];
        if (planetFilterData.length > 0) {
            filterConditions.push({ _planet: { $in: planetFilterData } });
        }
        if (systemFilterData.length > 0) {
            filterConditions.push({ _system: { $in: systemFilterData } });
        }
        if (shardFilterData.length > 0) {
            filterConditions.push({ _shard: { $in: shardFilterData } });
        }
        if (dateFilterData.length > 0) {
            filterConditions.push({ _startDate: { $in: dateFilterData } });
        }
        // filterConditions.push({ _startDate: { $in: dateFilterData } });
        // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! CURRENT FILTER")
        // console.log(dateFilterData)
        // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! PLANETS")
        // console.log(planetFilterData)
        // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! FILTER CONDITIONS")
        // console.log(filterConditions)
        
        const filter = filterConditions.length > 0 ? { $and: filterConditions } : {}; // If no filter conditions, return an empty filter

        return filter;
    }

    private extractIds(filterData: any) {
        const planetIds = filterData.planets.flatMap((planet: any) => planet._id);
        const systemIds = filterData.systems.flatMap((system: any) => system._id);
        const shardIds = filterData.shards.flatMap((shard: any) => shard._id);
        const dateIds = filterData.dates.flatMap((date: any) => date._id);
        const sortedPlanetIds = planetIds.sort();
        const sortedSystemIds = systemIds.sort();
        const sortedShardIds = shardIds.sort();
        const sortedDateIds = dateIds.sort();
    
        return { 
            planets: sortedPlanetIds, 
            systems: sortedSystemIds, 
            shards: sortedShardIds, 
            dates: sortedDateIds 
        };
    }

    public async getFilterData(){
        const filterData = await collections.filterCriteria?.findOne({_id: filterDataID});
        const ids = this.extractIds(filterData);
        return ids;
    }

    public async getCurrentFilterData(){
        const filterData = await collections.filterCriteria?.findOne({_id: currentFilterID});
        return {
            planets: filterData?.planets, 
            systems: filterData?.systems, 
            shards: filterData?.shards,  
            dates: filterData?.dates, 
        }
    }
    //#endregion FILTER

    //#region SORT
    //TODO ADD SORT AS PARAMETER
    public async updateCurrentSortData(criteria: any, direction: any){
        await collections.sortCriteria?.updateOne(
            { _id: currentSortID },
            { $set: { 
                criteria: criteria, 
                direction: direction
            } },
            { upsert: true }
        );
        await this.handleSortFilterViewR();
    }

    public async getCurrentSortData(){
        const sortData = await collections.sortCriteria?.findOne({_id: currentSortID})
        return {
            criteria: sortData?.criteria,
            direction: sortData?.direction
        }
        
    }

    public async getCurrentSort(){
        const currentSortData = await collections.sortCriteria?.findOne({_id: currentSortID})
        const sortCriteria = currentSortData?.criteria;
        const sortDirection = currentSortData?.direction;
        let sort: { [key: string]: number } = {};

        if (sortCriteria && sortDirection) {
            sort[sortCriteria] = sortDirection;
        }
        return sort;
    }

    //#endregion SORT

    //#region CHART
    public formatLists(list: any[], currentList: any[])  {
        const sortedList =currentList.sort((a, b) => {
            const idA = a.toString();
            const idB = b.toString();
            return idA.localeCompare(idB);
        });

        const formattedList = sortedList.map(item => {
            const listItem = list.find(listItem => listItem._id === item);
            return {
                _id: item,
                count: listItem ? listItem.count : 0 
            };
        })
        
        return formattedList

    };
    
    // id: some id
    // color
    // value : the number 
    // label : the text 
    // Function to add color property to each item in the list with a randomly generated color

    public getRandomBlueColor() {
        const hue = Math.random() < 0.5 ? 'orange' : 'blue'; // Randomly choose between 'orange' and 'blue' for the hue
        const color = randomColor({
            luminosity: 'bright',
            hue: hue
        });
        return color;
    }
    public formatItems(list?: any[]) {
        return list?.map(item => ({
            id: new ObjectId().toString(),
            color: this.getRandomBlueColor(),
            value: item.count,
            label: item._id.toString()
        })) || [];
    };

    // id: some id
    // color
    // value : the number 
    // label : the text 
    public async getChartData(){
        try{
            const planetData = await collections.editedBooks?.aggregate([
                { $group: { _id: "$_planet", count: { $sum: 1 } } }
            ]).toArray();


            const systemData = await collections.editedBooks?.aggregate([
                { $group: { _id: "$_system", count: { $sum: 1 } } }
            ]).toArray();
        
            const shardData = await collections.editedBooks?.aggregate([
                { $group: { _id: "$_shard", count: { $sum: 1 } } }
            ]).toArray();
        
            const dateData = await collections.editedBooks?.aggregate([
                { $group: { _id: "$_startDate", count: { $sum: 1 } } }
            ]).toArray();

            const chartData = {
                planets: this.formatItems(planetData?.sort((a, b) => a._id.localeCompare(b._id))),
                systems: this.formatItems(systemData?.sort((a, b) => a._id.localeCompare(b._id))),
                shards: this.formatItems(shardData?.sort((a, b) => a._id.localeCompare(b._id))),
                dates: this.formatItems(dateData?.sort((a, b) => a._id - b._id))
            }
    
            return chartData;
        }
        catch (error) {
            console.error("Error fetching book:", error);
            return error;
        }
        
    }
    //#endregion CHART
    
    //#region PAGINATION
    //updates the elements per page stuff
    public async updatePaginationData(elementsPerPage:number){
        const result = await collections.paginationCriteria?.updateOne(
            { _id: paginationDataID },
            { $set: { 
                elementsPerPage: elementsPerPage
            } },
            { upsert: true }
        );
        console.log("UPDATING PAGINATION")
        return result;
    }


    //retrieves the current elements per page 
    public async getCurrentElementsPerPage(){
        const paginationCriteria = await collections.paginationCriteria?.findOne({_id: paginationDataID})
        const elementsPerPage = paginationCriteria?.elementsPerPage;
        return elementsPerPage;
    }

    //gets the current available page number 
    //IF WE'RE DOING SEARCH, IT SHOULD ONLY BE CALLED AFTER IT
    //We'll divide this by the elements per page, round UP!! to the closest integer ang boom get page number
    public async getCurrentAvailableElementsCount(){
        const availableElements = await collections.editedBooks?.find({}).toArray();
        const availableElementsCount = availableElements?.length
        return availableElementsCount;
    }
    //#endregion

    //#region SEARCH
    public async getSearchResultWithCurrentCriteria(searchText: string){
        const regex = new RegExp(searchText, 'i');
        const books = await collections.editedBooks?.find({ _title: regex }).toArray();
        return books;
    }
    //#endregion
    

    public async getAllBooks() {
        const paginationCriteria = await collections.paginationCriteria?.findOne({_id: paginationDataID})
        const elementsPerPage = paginationCriteria?.elementsPerPage;

        const skipCount = (this._currentPage - 1) * elementsPerPage;

        console.log("ELEMENTS PER PAGE " + elementsPerPage)
        const books = await collections.editedBooks?.find({}).skip(skipCount).limit(elementsPerPage).toArray();
        return books;
    }

    public async getAllBooks_Length() {
        const books = await collections.editedBooks?.find({}).toArray();
        return books?.length;
    }

    public async getAllBooks_Collection() {
        const books = await collections.books?.find({}).toArray();
        return books;
    }


    public async getBookById(id: string)  {
        const book = await collections.books?.findOne({ _id: new ObjectId(id) });
        return book;
    }

    public async containsBook(id: string) {
        const book = await collections.books?.findOne({ _id: new ObjectId(id) })
        return !!book;
    }

    public getMockBook(): Book {
        return new Book(new ObjectId(), '', '', '', '', '', 0);
    }

    public async getSearchResult(searchText: string){
        const regex = new RegExp(searchText, 'i');
        const books = await collections.books?.find({ _title: regex }).toArray();
        return books;
    }

    public async addBook(book: Book) {
        try {
            const result = await collections.books?.insertOne(book);
            await this.handleSortFilterViewCRUD();
            return result;
        } catch (error) {
            console.error("Error adding book:", error);
            return false;
        }
        
    }

    public async deleteBook(id: string) {
        try {
            const result = await collections.books?.deleteOne({ _id: new ObjectId(id) });
            await this.handleSortFilterViewCRUD();
            return result;
        } catch (error) {
            console.error("Error deleting book:", error);
            return false;
        }
    }

    public async updateBook(book: Book): Promise<boolean> {
        try {
            const result = await collections.books?.replaceOne({ _id: book._id }, book);
            return result?.modifiedCount === 1;
        } catch (error) {
            console.error("Error updating book:", error);
            return false;
        }
    }

}