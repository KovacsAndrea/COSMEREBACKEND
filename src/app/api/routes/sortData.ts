import express from "express";
import { rafoServ } from "../../data";

export const sortData = express.Router()

sortData.get("/direction", (_req, _res, _next) => {
    _res.status(200).json({
        sortDirection: rafoServ.getSortDirection()
    })
})

sortData.patch("/direction", (_req, _res, _next) => {
    const sortDirection = _req.body.sortDirection
    rafoServ.setSortDirection(sortDirection)
    console.log(sortDirection)
    _res.status(200).json({
        sortDirection: sortDirection
    })
})

sortData.get("/criteria", (_req, _res, _next) => {
    _res.status(200).json({
        sortCriteria: rafoServ.getSortCriteria()
    })
})

sortData.patch("/criteria", (_req, _res, _next) => {
    const sortCriteria = _req.body.sortCriteria
    rafoServ.setSortCriteria(sortCriteria)
    _res.status(200).json({
        sortCriteria: sortCriteria
    })
})