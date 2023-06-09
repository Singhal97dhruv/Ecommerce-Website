const app=require("./backend/app")
const connectDb=require("./backend/config/database")
const cloudinary=require("cloudinary")
const dotenv = require("dotenv");
const { Server } = require("http");


//Handling uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
})

//config
// if(process.env.NODE_ENV!=="PRODUCTION"){
//     require("dotenv").config({path: "backend/config/config.env"})
// }

//config
dotenv.config({path:"backend/config/config.env"});


//Connecting DATABASE
connectDb();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const server=app.listen(process.env.PORT,(req,res)=>{
    console.log(`Server is running on port http://localhost:${process.env.PORT}`);
})


/// Unhandled Promise Rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(()=>{
        process.exit(1);
    })

})