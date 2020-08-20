const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const utils = require('./classes/Utils');


const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/rates', async (req, res) => {
    
    try{
        const file = utils.readFile(fs);
        const data = utils.processData(file);
        res.send(data);
    }
    catch(e) {
        res.send([]);
    }    

});

app.listen(3000, () => {
    console.log('server app listening on port 3000!')
  });