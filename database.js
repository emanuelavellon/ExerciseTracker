const mongoose=require('mongoose');

function connect(urlString){
    if(urlString){
        mongoose.connect(urlString);
        console.log("Database connected successfully")
    }else{
        console.error("Error during connection");
    }  
}

module.exports=connect;