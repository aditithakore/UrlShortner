const express = require('express');
const app= express();
const PORT= 8001;
const urlroute= require('./routes/url');
const {connectToMongoose} = require('./connection')

app.use(express.json())
connectToMongoose('mongodb://localhost:27017/shorturl').then(() => console.log("db connected"));


app.use('/url', urlroute);

app.listen(PORT,() => console.log(`listening on port:${PORT}`));

