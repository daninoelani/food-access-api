const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express()

const port = 4000;

app.listen(port, () => {
    console.log('Running on port ' + port)
})

app.use(cors())
app.use(bodyParser.json())

const Datastore = require('nedb-promise')
const db = new Datastore({
  filename: __dirname + '/contacts.db',
  autoload: true
});

app.get('/addresses', async (req, res) => {
    const results = await db.find();
    res.status(200).send(results);
});

app.post('/', async (req, res) => {
    const results = await db.insert(req.body)
    res.status(200).send(results)
});


