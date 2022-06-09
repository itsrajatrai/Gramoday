// express app that runs on port 8000
const express = require('express');
const app = express();
const db=require('./DB');
const bodyParser = require('body-parser');
const port = 8000;

app.get('/', (req, res) => {
    res.send(' This application is running on port 8000');
  })

// port 8000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}
)

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//route to insert data into the database
app.post('/reports', db.insertData);
//route to get all data from the database
app.get('/reports', db.getData);




