const ConnectToDB=require("./db");
const express= require("express");

ConnectToDB();

const app=express();

app.use(express.json());
app.use('/api',require("./Routes"));

const PORT=8000;

app.listen(PORT,()=>{
    console.log(`server is running on port: ${PORT}`);
})