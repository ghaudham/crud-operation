const express = require('express')
const bodyParser = require('body-parser')
const Port = 3000
const cors = require('cors');

//routes
const api = require('./route/api')
const product = require('./route/product');


const app = express()
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(bodyParser.json())
app.use('/api',api)
app.use('/product', product);

app.listen(Port,function(){
    console.log("server running on localhost:"+Port)
})