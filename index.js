const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const bodyParser=require('body-parser');
const connect=require('./database');
const controller=require('./controller');

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

connect(process.env.MONGO_URI);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.get('/api/users', async function(req, res){
  const result = await controller.getUsers();
  res.json(result);
})

app.post('/api/users', async function(req, res){
  const userName=req.body.username;
  const result= await controller.addUser(userName);
  
  res.json({
    username: result.username,
    _id: result._id
  });
});

app.post('/api/users/:_id/exercises', async function(req, res){
const id=req.params._id;
  const _user = await controller.getUsers(id);
  
  if(_user){
    const exerciseToSave={
      userId: _user._id,
      description: req.body.description,
      duration: parseInt(req.body.duration),
      date: req.body.date || new Date().toISOString().substring(0, 10)
  }
  
  const newExercise = await controller.addExercise(exerciseToSave);

    _user.date=newExercise.date;
    _user.duration=newExercise.duration;
    _user.description=newExercise.description;

    const responseObject = {
      _id: _user._id,
      username: _user.username, 
      date: new Date(_user.date).toDateString(),
      duration: _user.duration,
      description: _user.description
    };
   
    res.json(responseObject); 
}
});

app.get('/api/users/:_id/logs', async function(req, res){
  const _id = req.params._id;
  let user;
  let exercise;

  const logs ={
    _id: "",
    username: "",
    count: 0,
    log : []
  };
  try{

     user = await controller.getUsers(_id);
     exercise = await controller.getExercises(_id)

  }
  catch(err){
    console.log(err)
  }
  

  if(user){
    logs._id=user._id;
    logs.username=user.username;
  }
  if(exercise){
    logs.log=exercise;
    logs.count=exercise.length;
  }

  console.log(logs);
  res.json(logs);







});
 







const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
