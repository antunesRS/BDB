import MongoClient, { MongoCallback } from 'mongodb'

const URL = 'mongodb://localhost:27017/busca'
const DB_NAME = 'busca'

export default class Repository{

    public static save(collectionName : string, data : any, success : any, error : any ){

        MongoClient.connect(URL, 
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }, 
            (err, client) => {
            if(err){
                console.log(err)
                throw err
            }
            const db = client.db(DB_NAME)
            db.collection(collectionName)
            .findOneAndUpdate({name: data.userId},
                {
                    $setOnInsert: data,
                },
                {
                    returnOriginal: false,
                    upsert: true,
                }
            ).then(success).catch(error)
          })
    }

    public static find(searchParameter: Object, collection : string, callback : MongoCallback<any[]>){
        MongoClient.connect(URL, 
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }, 
            (err, client) => {
            if(err){
                console.log(err)
                throw err
            }
            const db = client.db(DB_NAME)
            db.collection(collection).find(searchParameter).toArray(callback)
          })
    }
}