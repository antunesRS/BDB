import MongoClient, { MongoCallback } from 'mongodb'

const URL = 'mongodb://localhost:27017/busca'
const DB_NAME = 'busca'

export default class Repository{

    public static save(collectionName : string, data : any){

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
            ).then(() => {
               console.log('User saved!')
            }).catch(error => {
                console.log(error)
                throw error
            })
          })
    }

    public static findByEmail(email: string, callback : MongoCallback<any[]>){
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
            db.collection('login').find({"email": email}).toArray(callback)
          })
    }
}