import { statisticsColors } from "../dummyData/appColors";
import { Book } from "../model/book";


export class StatisticsRepo {

    public getChartDataforPlanets(books: Book[]) {
        const planetCounts: Record<string, number> = {};
        books.sort((a, b) => a._planet.localeCompare(b._planet));
        books.forEach(book => {
            if (book._planet in planetCounts) {
                planetCounts[book._planet]++;
            } else {
                planetCounts[book._planet] = 1;
            }
        });
        const data: { id: number, color: string, value: number, label: string }[] = [];
        let idCounter = 0;
        for (const planet in planetCounts) {
            data.push({
                id: idCounter++,
                color: statisticsColors[idCounter % statisticsColors.length],
                value: planetCounts[planet],
                label: planet,
            });
        }
        return data;
    }

    public getChartDataForSystems(books: Book[]) {
        const systemCounts: Record<string, number> = {};
        books.forEach(book => {
            if (book._system in systemCounts) {
                systemCounts[book._system]++;
            } else {
                systemCounts[book._system] = 1;
            }
        });
        const data: { id: number, color: string, value: number, label: string }[] = [];
        let idCounter = 0;
        for (const system in systemCounts) {
            data.push({
                id: idCounter++,
                color: statisticsColors[idCounter % statisticsColors.length], 
                value: systemCounts[system],
                label: system,
            });
        }
        return data;
    }
    
    public getChartDataForShards(books: Book[]) {
        const shardCounts: Record<string, number> = {};
        books.forEach(book => {
            if (book._shard in shardCounts) {
                shardCounts[book._shard]++;
            } else {
                shardCounts[book._shard] = 1;
            }
        });
        const data: { id: number, color: string, value: number, label: string }[] = [];
        let idCounter = 0;
        for (const shard in shardCounts) {
            data.push({
                id: idCounter++,
                color: statisticsColors[idCounter % statisticsColors.length], 
                value: shardCounts[shard],
                label: shard,
            });
        }
        return data;
    }
    
    public getChartDataForDates(books: Book[]) {
        const dateCounts: Record<number, number> = {};
        books.forEach(book => {
            const year = book._startDate;
            if (year in dateCounts) {
                dateCounts[year]++;
            } else {
                dateCounts[year] = 1;
            }
        });
        const data: { id: number, color: string, value: number, label: string }[] = [];
        let idCounter = 0;
        for (const year in dateCounts) {
            data.push({
                id: idCounter++,
                color: statisticsColors[idCounter % statisticsColors.length], 
                value: dateCounts[year],
                label: year.toString(),
            });
        }
        return data;
    }

}