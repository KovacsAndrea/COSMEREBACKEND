import express from "express"
import { rafoServ } from "../../data"

export const paginationData = express.Router()

paginationData.get("/", (_req, _res, _next) => {
    _res.status(200).json({
        elementsPerPage: rafoServ.getElementsPerPage()
    })
})

paginationData.patch("/", (_req, _res, _next) => {
    const elementsPerPage = _req.body.elementsPerPage
    console.log(elementsPerPage)
    rafoServ.setElementsPerPage(elementsPerPage)
    
    _res.status(200).json({
        elementsPerPage: elementsPerPage
    })
})

paginationData.get("/max", (_req, _res, _next) => {
    console.log("MAX PAAAAAAAAAAAAAAAAAAAAAGE" + rafoServ.getMaxPage())
    _res.status(200).json({
        maxPage: rafoServ.getMaxPage()
    })
})

paginationData.get("/current", (_req, _res, _next) => {
    _res.status(200).json({
        currentPage: rafoServ.getCurrentPage()
    })
})

paginationData.patch("/current", (_req, _res, _next) => {
    const currentPage = _req.body.currentPage
    rafoServ.setCurrentPage(currentPage)
    console.log(currentPage)
    _res.status(200).json({
        currentPage: currentPage
    })
})
