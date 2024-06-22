import { ObjectId } from "mongodb";
import { collections } from "../../../database.service";
import { Chapter } from "../model/chapter";
import { AJPEChapters, SSFHChapters, TSMChapters, WSIChapters, WSIIChapters, WSIIIChapters, aoLChapters, bomChapters, dsChapters, edChapters, elChapters, lmChapters, obChapters, rowChapters, shChapters, sosChapters, tEMChapters, tHoAChapters, tHoEChapters, tWoAChapters, teSChapters, tfeChapters, tressChapters, wbChapters, wokChapters, worChapters, yumiChapters } from "../dummyData/mongoDummy";

export class MongoChapterRepo {
    
    public async getChaptersByBookId(bookId: string) {
        const result = await collections.chapterCollection?.
        find({_book_id: new ObjectId(bookId)})
        .sort({ _chapter_number: 1 })
        .toArray()
        return result;
    }

    public async getChapterByID(chapterId: string) {
        const result = await collections.chapterCollection?.findOne({_id: new ObjectId(chapterId)})
        return result
    }

    public async getAllChapters(){
        const result = await collections.chapterCollection?.find({}).toArray();
        return result;
    }

    public async addChapter(chapter: Chapter) {
        const result = await collections.chapterCollection?.insertOne(chapter)
        return result;
    }
    
    public async deleteChapter(chapterId: string){
        const result = await collections.chapterCollection?.deleteOne({_id: new ObjectId(chapterId) })
        return result;
    }

    public async getChapterFormat(bookId: string) {
        const chapters = await collections.chapterCollection?.find({_book_id: new ObjectId(bookId)})
        .sort({ _chapter_number: 1 })
        .toArray()
        let formattedChapters: string[] = [];
        chapters?.forEach(chapter => {
            let formattedChapter = `Ch.${chapter._chapter_number}: ${chapter._title}`;
            formattedChapters.push(formattedChapter);
        });
    
        return formattedChapters.join(', ');
    }

    public async resetOne(bookTitle: string, chapterList: Chapter[]){
        const book = await collections.books?.findOne({_title: bookTitle})
        if(book){
            chapterList.forEach(async chapter => {
                let addableChapter = new Chapter(
                    chapter._chapter_number,
                    chapter._title,
                    chapter._description,
                    chapter._wordcount,
                    chapter._pov,
                    new ObjectId, 
                    book._id, 
                )
                const result = await collections.chapterCollection?.insertOne(addableChapter)
                console.log(result)
            })
        }
    }


    public async resetChapters(){
        const deleteCount = await collections.chapterCollection?.deleteMany({});
        console.log(deleteCount)
        const wok = await collections.books?.findOne({_title: "The Way of Kings"})
        if(wok){
            wokChapters.forEach(async chapter => {
                let addableChapter = new Chapter(
                    chapter._chapter_number,
                    chapter._title,
                    chapter._description,
                    chapter._wordcount,
                    chapter._pov,
                    new ObjectId, 
                    wok._id, 
                )
                const result = await collections.chapterCollection?.insertOne(addableChapter)
                console.log(result)
            })
        }

        const wor = await collections.books?.findOne({_title: "Words of Radiance"})
        if(wor){
            worChapters.forEach(async chapter => {
                let addableChapter = new Chapter(
                    chapter._chapter_number,
                    chapter._title,
                    chapter._description,
                    chapter._wordcount,
                    chapter._pov,
                    new ObjectId, 
                    wor._id, 
                )
                const result = await collections.chapterCollection?.insertOne(addableChapter)
                console.log(result)
            })
        }

        const ob = await collections.books?.findOne({_title: "Oathbringer"})
        if(ob){
            obChapters.forEach(async chapter => {
                let addableChapter = new Chapter(
                    chapter._chapter_number,
                    chapter._title,
                    chapter._description,
                    chapter._wordcount,
                    chapter._pov,
                    new ObjectId, 
                    ob._id, 
                )
                const result = await collections.chapterCollection?.insertOne(addableChapter)
                console.log(result)
            })
        }
        

        
        const row = await collections.books?.findOne({_title: "Rhythm of War"})
        if(row){
            rowChapters.forEach(async chapter => {
                let addableChapter = new Chapter(
                    chapter._chapter_number,
                    chapter._title,
                    chapter._description,
                    chapter._wordcount,
                    chapter._pov,
                    new ObjectId, 
                    row._id, 
                )
                const result = await collections.chapterCollection?.insertOne(addableChapter)
                console.log(result)
            })
    
        }

        const ed = await collections.books?.findOne({_title: "Edgedancer"})
        if(ed){
            edChapters.forEach(async chapter => {
                let addableChapter = new Chapter(
                    chapter._chapter_number,
                    chapter._title,
                    chapter._description,
                    chapter._wordcount,
                    chapter._pov,
                    new ObjectId, 
                    ed._id, 
                )
                const result = await collections.chapterCollection?.insertOne(addableChapter)
                console.log(result)
            })
        }

        const ds = await collections.books?.findOne({_title: "Dawnshard"})
        if(ds){
            dsChapters.forEach(async chapter => {
                let addableChapter = new Chapter(
                    chapter._chapter_number,
                    chapter._title,
                    chapter._description,
                    chapter._wordcount,
                    chapter._pov,
                    new ObjectId, 
                    ds._id, 
                )
                const result = await collections.chapterCollection?.insertOne(addableChapter)
                console.log(result)
            })
        }

        const tfe = await collections.books?.findOne({_title: "Mistborn: The Final Empire"})
        if(tfe){
            tfeChapters.forEach(async chapter => {
                let addableChapter = new Chapter(
                    chapter._chapter_number,
                    chapter._title,
                    chapter._description,
                    chapter._wordcount,
                    chapter._pov,
                    new ObjectId, 
                    tfe._id, 
                )
                const result = await collections.chapterCollection?.insertOne(addableChapter)
                console.log(result)
            })
        }

        const tWoA = await collections.books?.findOne({_title: "Mistborn: The Well of Ascension"})
        if(tWoA){
            tWoAChapters.forEach(async chapter => {
                let addableChapter = new Chapter(
                    chapter._chapter_number,
                    chapter._title,
                    chapter._description,
                    chapter._wordcount,
                    chapter._pov,
                    new ObjectId, 
                    tWoA._id, 
                )
                const result = await collections.chapterCollection?.insertOne(addableChapter)
                console.log(result)
            })
        }
        
        await this.resetOne("Mistborn: The Hero of Ages", tHoAChapters)
        await this.resetOne("Mistborn: Secret History", shChapters)
        await this.resetOne("Mistborn: Alloy of Law", aoLChapters)
        await this.resetOne("Mistborn: Shadows of Self", sosChapters)
        await this.resetOne("Mistborn: Bands of Mourning", bomChapters)
        await this.resetOne("Mistborn: The Lost Metal", lmChapters)
        await this.resetOne("Yumi and the Nightmare Painter", yumiChapters)
        await this.resetOne("Tress of the Emerals Sea", tressChapters)
        await this.resetOne("Warbreaker", wbChapters)
        await this.resetOne("Elantris", elChapters)
        await this.resetOne("The Hope of Elantris", tHoEChapters)
        await this.resetOne("The Emperor\'s Soul", teSChapters)
        await this.resetOne("The Eleventh Metal", tEMChapters)
        await this.resetOne("Allomancer Jak and the Pits of Eltania, Episodes 28 through 30", AJPEChapters)
        await this.resetOne("White Sand I", WSIChapters)
        await this.resetOne("White Sand II", WSIIChapters)
        await this.resetOne("White Sand III", WSIIIChapters)
        await this.resetOne("Shadows for Silence in the Forests of Hell", SSFHChapters)
        await this.resetOne("The Sunlit Man", TSMChapters)

        
        return deleteCount;

    }
    
}