
import { ObjectId } from "mongodb";

export interface Book {
    _id: ObjectId;
    _title: string;
    _description: string;
    _planet: string;
    _system: string;
    _shard: string;
    _date: number;
    _chapterFormat?: string
}

export class Book implements Book{
    _id: ObjectId;
    _title: string;
    _description: string;
    _planet: string;
    _system: string;
    _shard: string; 
    _date: number; 
    _chapterFormat?: string;

    constructor(
        id: ObjectId,
        title: string,
        description: string,
        planet: string,
        system: string,
        shard: string, 
        startDate: number,
        chapterFormat?: string
        ){
            this._id = id;
            this._title = title;
            this._description = description;
            this._planet = planet; 
            this._system = system;
            this._shard = shard;
            this._date = startDate; 
            this._chapterFormat = chapterFormat;
        }

    public equals(other: Book): boolean {
        if (!other) return false; 
        return this._id == other._id &&
               this._title === other._title &&
               this._description === other._description &&
               this._planet === other._planet &&
               this._system === other._system &&
               this._shard === other._shard &&
               this._date === other._date;
    }

    public toString(): string {
        return `${this._title}:\n 
        Description: ${this._description}\n 
        Planet: ${this._planet}\n 
        System: ${this._system}\n 
        Shard: ${this._shard}\n 
        Start Date: ${this._date}\n`;
    }

}
