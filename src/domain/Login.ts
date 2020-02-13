import iDomain from "../interfaces/iDomain"
import passwordHasher from 'password-hash'
import {Profile} from '../enums/Enums'

export default class Login implements iDomain {
    
    private _user!: string
    private _password!: string
    private _profile!: Profile
    private _hashedPassword!: string
    

    fromDatabase(result: any[]) : Login {
       this._user = result[0].user
       this._password = result[0].password
       this._hashedPassword = result[0].hashedPassword
       this._profile = result[0].profile

       return this
    }

    fromRequest(req: any): Login {
        this._user = req.query.user
        this._password = req.query.password
        this._hashedPassword = passwordHasher.generate(req.query.password)
        this._profile = req.query.profile

        return this
    }
    
    toObject(): Object {
       return { 
            email: this._user, 
            password: this._password, 
            hashedPassword: this._hashedPassword,
            profile: this._profile
       }
    }

    public get user(): string {
        return this._user
    }

    public set user(value: string) {
        this._user = value
    }

    public get password(): string {
        return this._password
    }

    public set password(value: string) {
        this._password = value
    }

    public get profile(): Profile {
        return this._profile
    }

    public set profile(value: Profile) {
        this._profile = value
    }

    public get hashedPassword(): string {
        return this._hashedPassword
    }

    public set hashedPassword(value: string) {
        this._hashedPassword = value
    }
}