import { Data } from "../model/data";

export class DataRepo {
    private _dataRepo: Data = new Data();


    public getPlanets(): string[] {
        return this._dataRepo.planets;
    }

    public getSystems(): string[] {
        return this._dataRepo.systems;
    }


    public getShards(): string[] {
        return this._dataRepo.shards;
    }


    public getDates(): string[] {
        return this._dataRepo.dates;
    }

    public setPlanets(planets: string[]): void {
        this._dataRepo.planets = planets;
    }
    
    public setSystems(systems: string[]): void {
        this._dataRepo.systems = systems;
    }
    
    public setShards(shards: string[]): void {
        this._dataRepo.shards = shards;
    }
    
    public setDates(dates: string[]): void {
        this._dataRepo.dates = dates;
    }

    public addPlanet(planet: string): void {
        this._dataRepo.planets.push(planet);
        this._dataRepo.planets.sort();
    }

    public addSystem(system: string): void {
        this._dataRepo.systems.push(system);
        this._dataRepo.systems.sort();
    }

    public addShard(shard: string): void {
        this._dataRepo.shards.push(shard);
        this._dataRepo.shards.sort();
    }

    public addDate(date: string): void {
        this._dataRepo.dates.push(date);
        this._dataRepo.dates.sort();
    }

    public deletePlanet(planet: string): void {
        this._dataRepo.planets = this._dataRepo.planets.filter(item => item !== planet);
    }

    public deleteSystem(system: string): void {
        this._dataRepo.systems = this._dataRepo.systems.filter(item => item !== system);
    }

    public deleteShard(shard: string): void {
        this._dataRepo.shards = this._dataRepo.shards.filter(item => item !== shard);
    }

    public deleteDate(date: string): void {
        this._dataRepo.dates = this._dataRepo.dates.filter(item => item !== date);
    }

    public toString(): string {
        return `
            Planets: ${this.getPlanets().join(', ')} \n
            Systems: ${this.getSystems().join(', ')} \n
            Shards: ${this.getShards().join(', ')} \n
            Dates: ${this.getDates().join(', ')} \n
        `;
    }

    public getCategories(): string[] {
        let values = ["Planets", "Systems", "Shards", "Dates"]
        return values;
    }
}