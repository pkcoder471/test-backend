const mongoose=require("mongoose");
const mongoURI="mongodb://localhost:27017/test2";

const ConnectToDB= ()=>{ 
    mongoose.connect(mongoURI,async ()=>{
        console.log("connected to database successfully!!");
    })
}

module.exports = ConnectToDB;

