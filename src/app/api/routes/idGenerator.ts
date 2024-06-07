import express from "express";
import { rafoServ } from "../../data";
export const idGenerator = express.Router();

idGenerator.get("/", (_req, _res, _next) =>{
    _res.status(200).json({
        newId: rafoServ.getNewBookId()
    })
})