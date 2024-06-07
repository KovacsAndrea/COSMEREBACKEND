class CosmereError extends Error {
    private _status: number;

    constructor(message?: string) {
        super(message);
        this.name = 'CosmereError';
        this._status = 404; // Default status
    }

    public get status() {
        return this._status;
    }

    public set status(value: number){
        this._status = value;
    }

}


export default CosmereError