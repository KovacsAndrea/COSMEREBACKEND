import express from "express";
import {chapterRepo} from "../../data"

const chapterRouter = express.Router()

chapterRouter.get("/", (_req, _res, _next) => {
    const chapters = chapterRepo.chapters;
    _res.status(200).json({
        chapters: chapters
    })
})

chapterRouter.get("/format/:bookId", (_req, _res, _next) => {
    const bookId = _req.params.bookId;
    const chaptersFormat = chapterRepo.getChapterFormat(bookId);
    _res.status(200).json({
        chaptersFormat: chaptersFormat
    })
})

chapterRouter.get("/:bookId", (_req, _res, _next) => {
    const bookId = _req.params.bookId;
    const chapters = chapterRepo.getChaptersForBookId(bookId);
    _res.status(200).json({
        chapters: chapters
    })
})

chapterRouter.get("/chapter/:chapterId", (_req, _res, _next) => {
    const chapterId = _req.params.chapterId;
    const chapter = chapterRepo.getChapterById(chapterId);
    _res.status(200).json({
        chapter: chapter
    })
})

export default chapterRouter