const ConnectToDB=require("./db");
const express= require("express");
const cors = require('cors');

ConnectToDB();

const app=express();

app.use(cors());
app.use(express.json());
app.use('/api',require("./Routes"));

const PORT=8000;

app.listen(PORT,()=>{
    console.log(`server is running on port: ${PORT}`);
})