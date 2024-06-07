import express from "express"
import { rafoServ } from "../../data";
import { Book } from "../../../core/model/book";
import CosmereError from "../cosmereError";


const bookRouter = express.Router();

bookRouter.get("/search/:searchText", (_req, _res, _next) => {
    const searchText = _req.params.searchText;
    _res.status(200).json({
        searchText: searchText,
        books: rafoServ.getBooksByTitle(searchText)
    })
});

bookRouter.get("/generate/random", (_req, _res, _next) => {
    const book = rafoServ.generateRandomBook();
    _res.status(200).json({
        book: book
    })
})

//add a new book
bookRouter.post('/', (_req, _res, _next) => {
    const book = {
        id: _req.body.id,
        title: _req.body.title,
        description: _req.body.description,
        planet: _req.body.planet,
        system: _req.body.system,
        shard: _req.body.shard,
        date: _req.body.date
    };
    const newBook = new Book(
        book.id, 
        book.title, 
        book.description, 
        book.planet,
        book.system,
        book.shard,
        book.date);

    if(rafoServ.isValidNewBook(newBook)){
        rafoServ.addBook(newBook)
        _res.status(201).json({
            message: "POST /books -> add a new book",
            book: book
        });
    }else {
        const error = new CosmereError("Book data invalid");
        error.status = 500;
        _next(error);
    }
    
});

//get book by id
bookRouter.get('/:bookId',(_req, _res, _next) => {
    const bookId = _req.params.bookId
    let book = rafoServ.getBookById(bookId)
    if(!book){
        book = rafoServ.getMockBook(bookId);
    }
    _res.status(200).json({
        message: "GET /books{id}",
        book: book
    });
});



//update book 
bookRouter.patch('/:bookId',(_req, _res, _next) => {
    const id = _req.params.bookId;
    _res.status(200).json({
        message: "PATCH /books{id}",
        id: id
    });
});

//delete book 
bookRouter.delete('/:bookId',(_req, _res, _next) => {
    const id = _req.params.bookId;
    rafoServ.deleteBook(id);
    _res.status(200).json({
        message: "DELETE /books{id}",
        id: id
    });
});


export default bookRouter;