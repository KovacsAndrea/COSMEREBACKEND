import express from "express";
import { mongoChapterServ } from "../../data";
import { ObjectId } from "mongodb";
import { authenticateKnightRadiantJWT } from "./authRoutes";
import { Chapter } from "../../../core/model/chapter";

export const mongoChapterRouter = express.Router();

// mongoChapterRouter.get("", async(_req, _res, _next) => {
//     try{
//         //something
//         _res.status(200).json({
//             message: "Hello"
//         });
//     }
//     catch (error) {
//         _res.status(500).json({
//             error: error
//         }
//         );
//      }
// })

mongoChapterRouter.get("/", async(_req, _res, _next) => {
    try{
        const allChapters = await mongoChapterServ.getAllChapters();
        _res.status(200).json({
            allChapters: allChapters
        });
    }
    catch (error) {
        _res.status(500).json({
            error: error
        }
        );
     }
})

mongoChapterRouter.get("/:bookId",  async(_req, _res, _next) => {
    try{
        const bookId = _req.params.bookId;
        const chaptersOfBook = await mongoChapterServ.getChaptersByBookId(bookId)
        _res.status(200).json({
            message: "Hello",
            chaptersOfBook: chaptersOfBook
        });
    }
    catch (error) {
        _res.status(500).json({
            error: error
        }
        );
     }
})

mongoChapterRouter.get("/chapter/:chapterId",  async(_req, _res, _next) => {
    try{
        const chapterId = _req.params.chapterId;
        const chapter = await mongoChapterServ.getChaptersById(chapterId)
        _res.status(200).json({
            message: "Hello",
            chapter: chapter
        });
    }
    catch (error) {
        _res.status(500).json({
            error: error
        }
        );
     }
})

mongoChapterRouter.get("/format/:bookId", async(_req, _res, _next) => {
    try{
        const bookId = _req.params.bookId;
        const chapters = await mongoChapterServ.getChapterFormat(bookId);
        _res.status(200).json({
            message: "Hello",
            chapterFormat: chapters
        });
    }
    catch (error) {
        _res.status(500).json({
            error: error
        }
        );
     }
})

mongoChapterRouter.post("/", authenticateKnightRadiantJWT, async(_req, _res, _next) => {
    try{
        const chapter = new Chapter(
            parseInt(_req.body._chapter_number),
            _req.body._title,
            _req.body._description,
            parseInt(_req.body._wordcount),
            _req.body._pov,
            new ObjectId(_req.body._id),
            new ObjectId(_req.body._book_id),
        )
        const result = await mongoChapterServ.addChapter(chapter)
        if (result) {
            console.log(`Successfully created a new chapter with id ${result.insertedId}`);
        } else {
            console.error("Failed to create a new chapter.");
        }
        _res.status(201).json({ 
            message: `Successfully created a new chapter`,
            result: result
        });
    }
    catch (error) {
        _res.status(500).json({
            error: error
        }
        );
     }
})

mongoChapterRouter.delete("/:chapterId", authenticateKnightRadiantJWT, async(_req, _res, _next) => {
    try{
        const chapterId = _req.params.chapterId;
        const result = await mongoChapterServ.deleteChapter(chapterId)
        if (result) {
            console.log(`Successfully deleted the chapter with data ${result}`);
        } else {
            console.error("Failed to delete chapter.");
        }
        _res.status(201).json({ 
            message: `Successfullydeleted the chapter`,
            result: result
        });
    }
    catch (error) {
        _res.status(500).json({
            error: error
        }
        );
     }
})

mongoChapterRouter.get("/chapters/reset", async (_req, _res, _next) => {
    try{
        const result = await mongoChapterServ.resetChapters();
        _res.status(200).json({
            mesage: "haha",
            result: result
        });
    } catch (error) {
        _res.status(500).json({
            error: error
        }
        );
     }
})