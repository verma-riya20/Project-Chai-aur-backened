import dotenv from 'dotenv'
import connectdb from './db/index.js';
import express from 'express'
dotenv.config(

);
const app=express();
connectdb()
.then(()=>{
    app.listen(process.env.PORT|| 8000)
    console.log(`Server is listening on ${process.env.PORT}`)
})
.catch((error)=>{
    console.log("MongoDB connection failed",error)
})

//iffi function--immediated call--method 1
/*(async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`,{
            
        })
        
        app.on("errror",(error)=>{
            console.log("errror",error)
            throw error
        })
        app.listen(process.env.PORT,()=>{
            console.log(`App is listening on Port ${process.env.PORT}`)
        })
        
    } catch (error) {
        console.error("Error",error)
        throw error
        
    }
})()
    */