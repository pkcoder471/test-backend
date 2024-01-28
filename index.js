const ConnectToDB=require("./db");
const express= require("express");

ConnectToDB();

const app=express();

const PORT=8000;

app.listen(PORT,()=>{
    console.log(`server is running on port: ${PORT}`);
})