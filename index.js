const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();

app.use(cors())

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.on('error', function (e) {
  console.log('error', e)
});

app.post('/login', (req, res) => {
  const token = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    data: 'foobar'
  }, 'secret');
  console.log("req.body", req.body)
  if(req.body.username === 'username' && req.body.password === 'password') res.send({token, name: 'Peter', role: 'Admin'});
  else res.status(400).send({message: 'incorrect user'})
});


app.post('/user', (req, res) => {
  try {
    const decoded = jwt.verify(req.body.token, 'secret');
    res.send({name: 'Peter', role: 'Admin'});
    
  } catch(err) {
    res.status(400).send({message: 'incorrect token'})
  }
});


app.listen(process.env.PORT || 3005, () => console.log('Server is running on port 3005!'));
