import Location from "./Location"
import express from 'express'
import iDomain from "../interfaces/iDomain"

export default class UserData implements iDomain{
    private _name!: string
    private _location!: Location
    private _selfDescription!: string
    private _imageId!: string
    private _birthDate! : string

    fromDatabase(result: any[]) : UserData {
        this._name = result[0].name, 
        this._location = new Location(result[0].latitude, result[0].longitude)
        this._selfDescription = result[0].selfDescription
        this._imageId = result[0].imageId
        this._birthDate = result[0].birthDate
      
        return this
    }

    public toDatabase() : Object {
        return {
            name: this._name,
            selfDescription : this._selfDescription, 
            latitude: this._location.latitude,
            longitude: this._location.longitude,
            imageId: this._imageId,
            birthDate: this._birthDate
        }
    }


    public fromRequest(req : express.Request) : UserData{
        this._name = req.query.name 
        this._selfDescription = req.query.selfDescription
        this._location = new Location(req.query.latitude, req.query.longitude)
        this._imageId = req.query.imageId
        this._birthDate = req.query.birthDate
      
        return this
    }

    public get name(): string {
        return this._name
    }
    
    public set name(value: string) {
        this._name = value
    }

    public get selfDescription(): string {
        return this._selfDescription
    }

    public set selfDescription(value: string) {
        this._selfDescription = value
    }

    public get location(): Location {
        return this._location
    }

    public set location(value: Location) {
        this._location = value
    }

    public get imageId(): string {
        return this._imageId
    }

    public set imageId(value: string) {
        this._imageId = value
    }
    
    public get birthDate() : string{
        return this._birthDate
    }

    public set birthDate(value: string){
        this._birthDate = value
    }
}