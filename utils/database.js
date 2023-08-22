import mongoose from "mongoose";
require('dotenv').config();

let isConnected = false ;

export const ConnectionToDB=()=>{

    mongoose.set('strictQuery',true)
    if(isConnected){
        console.log('already connected to database')
        return;
    }
    try {
        mongoose.connect(process.env.MONGODB_URL,{
            dbName: "script_s",
            useNewUrlParser: true ,
            useUnifiedTopology: true,
        })
        console.log('connected to database sucessfuly *\/*')
        isConnected=true;
    } catch (error) {
        console.log(error.message)
    }

}