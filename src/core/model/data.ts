
export class Data{
    private _planets: string[] = [];
    private _systems: string[] = [];
    private _shards: string[] = [];
    private _dates: string[] = [];

    public set planets(value: string[]) {
        this._planets = value;
    }

    public get planets(): string[] {
        return this._planets;
    }

    public set systems(value: string[]) {
        this._systems = value;
    }

    public get systems(): string[] {
        return this._systems;
    }

    public set shards(value: string[]) {
        this._shards = value;
    }

    public get shards(): string[] {
        return this._shards;
    }

    public set dates(value: string[]) {
        this._dates = value;
    }

    public get dates(): string[] {
        return this._dates;
    }
}