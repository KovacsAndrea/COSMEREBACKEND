import { ObjectId } from "mongodb";

export interface Chapter {
    _id?: ObjectId;
    _book_id?: ObjectId;
    _chapter_number: number;
    _title: string;
    _description: string; 
    _wordcount: number;
    _pov: string;
}
export class Chapter {
    public _id?: ObjectId;
    public _book_id?: ObjectId;
    public _chapter_number: number;
    public _title: string;
    public _description: string; 
    public _wordcount: number;
    public _pov: string;

    constructor(chapter_number: number, title: string, description: string, wordcount: number, pov: string, id?: ObjectId, book_id?: ObjectId,) {
        this._id = id;
        this._book_id = book_id;
        this._chapter_number = chapter_number;
        this._title = title;
        this._description = description;
        this._wordcount = wordcount;
        this._pov = pov;
    }

    toString(): string {
        return `Ch.${this._chapter_number}: ${this._title}`;
    }

}