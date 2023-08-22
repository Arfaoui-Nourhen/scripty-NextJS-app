import mongoose from "mongoose";
require('dotenv').config();

let isConnected = false ;

export const ConnectionToDB=async ()=>{

    mongoose.set('strictQuery',true)
    if(isConnected){
        console.log('already connected to database')
        return;
    }
    try {
       await mongoose.connect(process.env.MONGODB_URL,{
            dbName: "script_s",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        isConnected=true;
        console.log('connected to database sucessfuly *\/*')
    } catch (error) {
        console.log(error)
    }

}