
import express from "express"
import { rafoServ } from "../../data";

export const filterData = express.Router();




filterData.patch("/planets", (_req, _res, _next) => {
    const filterData = {
        data: _req.body.data,
    }
    rafoServ.setCurrentPlanetData(filterData.data)
    _res.status(200).json({
        filterData: filterData
    })
} )

filterData.get("/planets", (_req, _res, _next) => {
    _res.status(200).json({
        filterData: rafoServ.getPlanetData()
    })
} )

filterData.get("/current/planets", (_req, _res, _next) => {
    _res.status(200).json({
        filterData: rafoServ.getCurrentPlanetData()
    })
} )




filterData.patch("/systems", (_req, _res, _next) => {
    const filterData = {
        data: _req.body.data,
    }
    rafoServ.setCurrentSystemData(filterData.data)
    _res.status(200).json({
        filterData: filterData
    })
} )

filterData.get("/systems", (_req, _res, _next) => {
    _res.status(200).json({
        filterData: rafoServ.getSystemData()
    })
} )

filterData.get("/current/systems", (_req, _res, _next) => {
    _res.status(200).json({
        filterData: rafoServ.getCurrentSystemData()
    })
} )




filterData.patch("/shards", (_req, _res, _next) => {
    const filterData = {
        data: _req.body.data,
    }
    rafoServ.setCurrentShardData(filterData.data)
    _res.status(200).json({
        filterData: filterData
    })
})

filterData.get("/shards", (_req, _res, _next) => {
    _res.status(200).json({
        filterData: rafoServ.getShardData()
    })
})

filterData.get("/current/shards", (_req, _res, _next) => {
    _res.status(200).json({
        filterData: rafoServ.getCurrentShardData()
    })
})




filterData.patch("/dates", (_req, _res, _next) => {
    const filterData = {
        data: _req.body.data,
    }
    rafoServ.setCurrentDateData(filterData.data)
    _res.status(200).json({
        filterData: filterData
    })
})

filterData.get("/dates", (_req, _res, _next) => {
    _res.status(200).json({
        filterData: rafoServ.getDateData()
    })
})

filterData.get("/current/dates", (_req, _res, _next) => {
    _res.status(200).json({
        filterData: rafoServ.getCurrentDateData()
    })
})