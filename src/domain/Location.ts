export default class Location{
    private _latitude!: string
    private _longitude!: string

    constructor(latitude : string, longitude : string){
        this._latitude = latitude
        this._longitude = longitude
    }

    public compareLocation(location : string) : boolean {
        return true
    }

    get latitude(){
        return this._latitude
    }

    get longitude(){
        return this._longitude
    }
}