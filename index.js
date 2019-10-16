const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.post('/login', (req, res) => {
  const token = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    data: 'foobar'
  }, 'secret');

  if(req.body.username === 'username' && req.body.password === 'password') res.send(token);
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


app.listen(3005, () => console.log('Server is running on port 3005!'));