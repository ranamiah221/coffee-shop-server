const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app= express();
const port = process.env.PORT || 5000;

// MIDDLE WARE
app.use(cors())
app.use(express.json())

app.get('/', (req, res)=>{
    res.send('coffee shop server')
})

app.listen(port, ()=>{
    console.log(`coffee shop running on port : ${port}`)
})