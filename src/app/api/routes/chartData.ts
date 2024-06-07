import express from "express"
import { rafoServ } from "../../data";
import { DataValidator } from "../../../core/model/dataValidator";
import CosmereError from "../cosmereError";
const dataValidator = new DataValidator();

export const chartData = express.Router()
chartData.get("/planets", (_req, _res, _next) => {
    const response = rafoServ.getChartDataForPlanets();
    dataValidator.validateChartData(response)
    if(dataValidator){
        _res.status(200).json({
            chartData: rafoServ.getChartDataForPlanets()
        })
    }
    else {
        const error = new CosmereError("Not Found");
        error.status = 404;
        _next(error);
    }
} )

chartData.get("/", (_req, _res, _next) => {
    _res.status(200).json({
        message: "Nimic"
    })
} )

chartData.get("/systems", (_req, _res, _next) => {
    _res.status(200).json({
        chartData: rafoServ.getChartDataForSystems()
    })
} )


chartData.get("/shards", (_req, _res, _next) => {
    _res.status(200).json({
        chartData: rafoServ.getChartDataForShards()
    })
})


chartData.get("/dates", (_req, _res, _next) => {
    _res.status(200).json({
        chartData: rafoServ.getChartDataForDates()
    })
})

