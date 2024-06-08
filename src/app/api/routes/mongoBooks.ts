import express from "express"
import { collections } from "../../../../database.service";
import { mongoBookServ, rafoRepo } from "../../data";
import { ObjectId } from "mongodb";
import { authenticateBridgemanJWT, authenticateKnightRadiantJWT, authenticateSurgebinderJWT } from "./authRoutes";
import { Book } from "../../../core/model/book";

export interface FilterData {
    planets: string[]; // Assuming planets is an array of strings
    systems: string[]; // Assuming systems is an array of strings
    shards: string[]; // Assuming shards is an array of strings
    dates: number[]; // Assuming dates is an array of numbers
}

export interface SortData {
    criteria: string,
    direction: number
}

export interface ChartElement {
    _id: string;
    color: string;
    value: number;
    label: string;
}

export interface ChartData {
    planets: ChartElement[];
    systems: ChartElement[];
    shards: ChartElement[];
    dates: ChartElement[];
}

export const mongoBookRouter = express.Router();

//#region  BOOK VIEW
///get all
mongoBookRouter.get("/", async (_req, _res, _next) => {
    try{
        const books = await mongoBookServ.getAllBooks();
        _res.status(200).json({
            mesage: "trying to get books",
            books: books
        });
    } catch (error) {
        _res.status(500).json({
            error: error
        }
        );
     }
})

mongoBookRouter.get("/view/length", async (_req, _res, _next) => {
    try{
        const books_length = await mongoBookServ.getAllBooks_Length();
        _res.status(200).json({
            mesage: "trying to get books",
            length: books_length
        });
    } catch (error) {
        _res.status(500).json({
            error: error
        }
        );
     }
})

///get books by search text
mongoBookRouter.get("/search/:SearchText", async(_req, _res, _next) => {
    const searchText = _req.params.SearchText;
    try{
        const books = await mongoBookServ.getSearchResultWithCurrentCriteria(searchText);
        _res.status(200).json({
            message: "Searching books",
            books: books
        })
    }
    catch (error) {
        console.log()
        _res.status(400).json({ error: error });
     }
})
//#endregion



//#region BOOK COLLECTION 
//get by id
mongoBookRouter.get("/:ID", async (_req, _res, _next) => {
    const ID = _req.params.ID;
    try{
        let book = await mongoBookServ.getBookById(ID);
        _res.status(200).json({
            mesage: "trying to get books",
            book: book
        });
    } catch (error) {
        console.log()
        _res.status(400).json({ error: error });
     }
})

///get mock book
mongoBookRouter.get("/mockBook/book", async (_req, _res, _next) => {
    try{
        let book = await mongoBookServ.getMockBook();
        _res.status(200).json({
            mesage: "Getting mock book",
            book: book
        });
    } catch (error) {
        console.log()
        _res.status(400).json({ error: error });
     }
})

///add book 
mongoBookRouter.post("/", authenticateKnightRadiantJWT, async(_req, _res, _next) => {
    const book = {
        _id: _req.body._id,
        _title: _req.body._title,
        _description: _req.body._description,
        _planet: _req.body._planet,
        _system: _req.body._system,
        _shard: _req.body._shard,
        _startDate: _req.body._startDate
    };
    console.log("    ----------- THIS IS MY DATE         " + book._startDate)
    const transformedBook = new Book(
        new ObjectId(book._id),
        book._title,
        book._description,
        book._planet,
        book._system,
        book._shard,
        parseInt(book._startDate)
    );
    
    try{
        const result = await mongoBookServ.addBook(transformedBook);
        if (result) {
            console.log(`Successfully created a new book with id ${result.insertedId}`);
        } else {
            console.error("Failed to create a new book.");
        }
        _res.status(201).json({ message: `Successfully created a new book`});
    } catch (error) {
        console.error(error);
        _res.status(400).json({ error: error });
    }
})

///delete book 
mongoBookRouter.delete("/:ID", authenticateKnightRadiantJWT, async (_req, _res, _next) => {
    const ID = _req.params.ID;
    try{
        let result = await mongoBookServ.deleteBook(ID);
        _res.status(200).json({
            mesage: "trying to delete book",
            result: result
        });
    } catch (error) {
        console.log()
        _res.status(400).json({ error: error });
     }
})

///get new id for book 
mongoBookRouter.get("/new/ID", async(_req, _res, _next) => {
    try {
        const newId = new ObjectId();
        _res.status(200).json({ newId: newId.toHexString() });
    } catch (error) {
        console.error("Error generating new ID:", error);
        _res.status(500).json({ error: "Internal server error" });
    }
})
//#endregion



//#region FILTER
//get filetr dadta
mongoBookRouter.get("/filter/data", async(_req, _res, _next) => {
    try{
        const filterData = await mongoBookServ.getFilterData();
        _res.status(200).json({
            filterData: filterData,
        })
    }catch(error){
        _res.status(400).json({error: error})
    }
})

//get current filter data
mongoBookRouter.get("/filter/current/data", async(_req, _res, _next) =>{
    try{
        const currentFilterData = await mongoBookServ.getCurrentFilterData();
        _res.status(200).json({
            currentFilterData: currentFilterData,
        })
    }catch(error){
        _res.status(400).json({error: error})
    }
})

mongoBookRouter.patch("/filter/current/data", authenticateSurgebinderJWT, async(_req, _res, _next) =>{
    try{
        const planetData = _req.body.planetData
        const systemData = _req.body.systemData
        const shardData = _req.body.shardData
        const dateData = _req.body.dateData
        const result = await mongoBookServ.updateCurrentFilterData(
            planetData,
            systemData,
            shardData,
            dateData
        )
        _res.status(200).json({
            message: "Updated current filter data.",
            result: result
        })
    }catch(error){
        _res.status(400).json({error: error})
    }
})
//#endregion



//#region SORT
mongoBookRouter.get("/sort/current/data", async(_req, _res, _next) =>{
    try{
        const sortData = await mongoBookServ.getCurrentSortData();
        _res.status(200).json({
            message: "Getting current sort data.",
            sortData: sortData
        })
    }catch(error){
        _res.status(400).json({error: error})
    }
})

mongoBookRouter.patch("/sort/current/data", authenticateSurgebinderJWT, async(_req, _res, _next) =>{
    try{
        const criteria = _req.body.criteria;
        const direction = _req.body.direction;
        await mongoBookServ.updateCurrentSortData(criteria, direction)
        _res.status(200).json({
            message: "Updating current sort data.",
        })
    }catch(error){
        _res.status(400).json({error: error})
    }
})
//#endregion



//#region CHART
mongoBookRouter.get("/chart/data", async(_req, _res, _next) =>{
    try{
        const chartData = await mongoBookServ.getChartData();
        _res.status(200).json({
            message: "Getting chart data.",
            chartData: chartData
        })
    }catch(error){
        _res.status(400).json({error: error})
    }
})
//#endregion



//#region PAGINATION
mongoBookRouter.get("/pagination/elementsPerPage", async(_req, _res, _next) =>{
    try{
        const elementsPerPage = await mongoBookServ.getCurrentElementsPerPage()
        _res.status(200).json({
            message: "Getting elements per page",
            elementsPerPage: elementsPerPage
        })
    }
    catch(error){
        _res.status(400).json({error: error})
    }
})

mongoBookRouter.patch("/pagination/elementsPerPage", authenticateSurgebinderJWT, async(_req, _res, _next) =>{
    try{
        const elementsPerPage = _req.body.elementsPerPage;
        const result = await mongoBookServ.updateElementsPerPage(elementsPerPage)
        _res.status(200).json({
            message: "Updating current sort data.",
            result: result
        })
    }catch(error){
        _res.status(400).json({error: error})
    }
})

mongoBookRouter.get("/pagination/currentPage", async(_req, _res, _next) =>{
    try{
        const currentPage = mongoBookServ.getCurrentPage()
        console.log(currentPage)
        _res.status(200).json({
            message: "Getting current page",
            currentPage: currentPage
        })
    }
    catch(error){
        _res.status(400).json({error: error})
    }
})

mongoBookRouter.patch("/pagination/currentPage", async(_req, _res, _next) =>{
    try{
        const currentPage = _req.body.currentPage;
        mongoBookServ.updateCurrentPage(currentPage)
        _res.status(200).json({
            message: "Getting elements per page",
            currentPage: currentPage
        })
    }
    catch(error){
        _res.status(400).json({error: error})
    }
})
//#endregion



//#region RESET
mongoBookRouter.post("/localWrite", async (_req, _res, _next) => {
    try {
        if (!collections.books) {
            throw new Error("Collections.books is not initialized.");
        }
        const allBooks = rafoRepo.getAllBooks(); 
        for (const book of allBooks) {
            const transformedBook = new Book(
                new ObjectId(book._id),
                book._title,
                book._description,
                book._planet,
                book._system,
                book._shard,
                book._startDate
            );
            const result = await collections.books.insertOne(transformedBook);
            if (result) {
                console.log(`Successfully created a new book with id ${result.insertedId}`);
            } else {
                console.error("Failed to create a new book.");
            }
        }
        _res.status(201).json({ message: "Successfully created all books." });
    } catch (error) {
        console.error(error);
        _res.status(400).json({ error: error });
    }
})

mongoBookRouter.delete("/delete/deleteAll", async (_req, _res, _next) => {
    try {
        if (!collections.books) {
            throw new Error("Collections.books is not initialized.");
        }
        const result = await collections.books.deleteMany({});
        if (result.deletedCount !== undefined && result.deletedCount > 0) {
            console.log(`Successfully deleted ${result.deletedCount} books.`);
            _res.status(200).json({ message: `Successfully deleted ${result.deletedCount} books.` });
        } else {
            console.error("Failed to delete books or no books found.");
            _res.status(404).json({ message: "No books found to delete." });
        }
    } catch (error) {
        console.error(error);
        _res.status(400).json({ error: error });
    }
})
//#endregion



