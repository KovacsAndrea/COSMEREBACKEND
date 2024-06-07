import { BookRepo } from "../core/repo/bookRepo";
import { BookServ } from "../core/service/bookServ";
import { DataValidator } from "../core/model/dataValidator";
import { ChapterRepo } from "../core/repo/chapterRepo";
import { MongoBookRepo } from "../core/repo/mongoBookRepo";
import { MongoBookServ } from "../core/service/mongoBookServ";
import { MongoChapterRepo } from "../core/repo/mongoChapterRepo";
import { MongoChapterServ } from "../core/service/mongoChapterServ";
import { MongoUserRepo } from "../core/repo/mongoUserRepo";
import { MongoUserService } from "../core/service/mongoUserServ";

export const rafoRepo = new BookRepo();
rafoRepo.useLocalData();
export const rafoServ = new BookServ(rafoRepo)
export const dataValidator = new DataValidator();
export const chapterRepo = new ChapterRepo();
chapterRepo.useDummyData()
export const mongoBookRepo = new MongoBookRepo();
export const mongoBookServ = new MongoBookServ(mongoBookRepo);

export const mongoChapterRepo = new MongoChapterRepo();
export const mongoChapterServ = new MongoChapterServ(mongoChapterRepo);

export const mongoUserRepo = new MongoUserRepo();
export const mongoUserServ = new MongoUserService(mongoUserRepo);