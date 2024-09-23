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

app.get('/api/users', function(req, res){
  
})

app.post('/api/users', async function(req, res){
  const userName=req.body.username;
  const result= await controller.addUser(userName);
  
  res.json({
    username: result.username,
    _id: result._id
  });
});







const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
