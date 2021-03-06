//API SERVER
const express = require('express'); //initiate express
const bcrypt = require('bcrypt-nodejs');
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')
const cors = require('cors');
const db = require('knex')({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl: true,
  }
});

const app = express(); //initiating app
app.use(express.json());
app.use(cors());

//END POINTS
app.get('/', (request, response) => {response.send('It is working!'); })
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.put('/image', (req, res) => {image.handleImage(req, res, db)}) //SEND_POINT_FROM_SERVER
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {//run app 
  console.log(`App is running on port ${PORT}`)
})