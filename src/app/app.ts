import express, {Request, Response, NextFunction} from "express"
import bookRouter from "./api/routes/bookRoutes";
import morgan from "morgan"
import bodyParser from "body-parser"
import CosmereError from "./api/cosmereError";
import { idGenerator } from "./api/routes/idGenerator";
import { filterData } from "./api/routes/filterData";
import { sortData } from "./api/routes/sortData";
import { chartData } from "./api/routes/chartData";
import { paginationData } from "./api/routes/paginationData";
import chapterRouter from "./api/routes/chapterRoutes";
import { connectToDatabase } from "../../database.service";
import { mongoBookRouter } from "./api/routes/mongoBooks";
import { mongoChapterRouter } from "./api/routes/mongoChapters";
import { mongoUserRouter } from "./api/routes/authRoutes";


const app = express();


//routes which shouldd handle requests
connectToDatabase().then(() => {
    app.use(morgan('dev'));
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true })); 

    app.use((_req, _res, _next) => {
        _res.header("Access-Control-Allow-Origin", "*");
        _res.header("Access-Control-Allow-Headers", "*");
        if (_req.method === 'OPTIONS') {
            _res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET")
            return _res.status(200).json({})
        }
        _next();
    })
    app.use("/books", bookRouter)
    app.use("/newId", idGenerator)
    app.use("/filter", filterData)
    app.use("/sort", sortData)
    app.use("/chart", chartData)
    app.use("/pagination", paginationData)
    app.use("/chapters", chapterRouter)
    app.use("/mongoBooks", mongoBookRouter)
    app.use("/mongoChapters", mongoChapterRouter)
    app.use("/mongoUsers", mongoUserRouter)
    
    app.get('/ping', (_req, _res) => {
        _res.status(200).send('Server is up and running.');
      });
    
    app.use((_req, _res, _next) => {
        const error = new CosmereError("Not Found");
        error.status = 404;
        _next(error);
    })
    
    app.use((_error: CosmereError, _req: Request, _res: Response, _next: NextFunction) => {
        _res.status(_error.status || 500);
        _res.json({
            _error: {
                message: _error.message
            }
        })
    })
}).catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
});

export default app;