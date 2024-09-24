const {userModel, exerciseModel} = require('./model');

function getUsers(_id){
   return new Promise((resolve, reject)=>{
    let _users;
    if(!_id){
      _users=userModel.find();
      if(_users==undefined) reject("Error");
      resolve(_users);
    }else{
      return userModel.findById(_id)
      .then(data => {
        if (!data) {
        return reject("Error")
        }
        return resolve(data);
    })
    .catch(err => {
        throw new Error("Error: " + err.message);
    });
    }
    resolve(_users);
   })
}

function addUser(username){
    return new Promise(async (resolve, reject)=>{
        if(!username) reject("No username")

        const _user = new userModel({username});
        const result =  await _user.save();
        resolve(result);   
    });    
}

function getExercises(id){
  return new Promise((resolve, reject)=>{
    const exercises=exerciseModel.find({userId: id})
    if(exercises==undefined) reject("Error");
    resolve(exercises);
  })
}

function addExercise(exercise){
    return new Promise((resolve, reject)=>{
        if(!exercise) reject("Error");

        const _exercise= new exerciseModel(exercise);
        _exercise.save()
          .then(data=>{
            resolve(data);
          })
          .catch(err=>{
            reject(err);
          })
    })
}

module.exports={
    getUsers,
    addUser,
    addExercise,
    getExercises
}