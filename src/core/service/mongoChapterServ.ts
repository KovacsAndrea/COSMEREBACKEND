
import { Chapter } from "../model/chapter";
import { MongoChapterRepo } from "../repo/mongoChapterRepo"

export class MongoChapterServ {
    private chapterRepo: MongoChapterRepo

    constructor(chapterRepo: MongoChapterRepo){
        this.chapterRepo = chapterRepo;
    }

    public async getAllChapters() {
        const result = await this.chapterRepo.getAllChapters();
        return result;
    }

    public async getChaptersByBookId(bookId: string) {
        const result = await this.chapterRepo.getChaptersByBookId(bookId);
        return result;
    }

    public async getChaptersById(chapterId: string){
        const result = await this.chapterRepo.getChapterByID(chapterId);
        return result;
    }

    public async getChapterFormat(bookId: string){
        const result = await this.chapterRepo.getChapterFormat(bookId)
        return result;
    }

    public async addChapter(chapter: Chapter){
        const result = await this.chapterRepo.addChapter(chapter)
        return result;
    }

    public async deleteChapter(chapterId: string){
        const result = await this.chapterRepo.deleteChapter(chapterId)
        return result;
    }

    public async resetChapters() {
        const result = await this.chapterRepo.resetChapters();
        return result;
    }
}