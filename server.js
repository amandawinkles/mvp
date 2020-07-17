const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const static = require('express-static');
const mysql = require('mysql');
const path = require('path');
const port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile('index');
});

// app.get('/artists', (req, res) => {
//   let faves = `SELECT * FROM  `; //fill-in when db setup
//   db.query(faves, (err, result) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log('result: ', result);
//     res.send(result);
//   })
// });

// app.post('/favorites', (req, res) => {
//   console.log('req.body: ', req.body);
//   let faves = `INSERT INTO VALUES (?)`; //fill-in when db setup
//   db.query(faves, (err, result) => {
//     if (err) {
//       res.send('error posting likedArtists', err);
//     }
//     res.send('likedArtists posted');
//   })
// });


//connect w/db
// const db = mysql.createConnection({
//   user: 'root',
//   password: '',
//   database: 'artistFaves'
// });

// db.connect();



app.listen(port, () => console.log(`app listening at http://localhost:${port}`));

module.exports = app;