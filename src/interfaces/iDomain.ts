export default interface iDomain{

    fromDatabase(result : any[]) : any
    fromRequest(req : any) : any
    toDatabase() : Object
    
}