const {userModel, exerceseModel} = require('./model');

function addUser(username){
    return new Promise(async (resolve, reject)=>{
        if(!username) reject("No username")

        const _user = new userModel({username});
        const result =  await _user.save();
        resolve(result);   
    });    
}

module.exports={
    addUser
}