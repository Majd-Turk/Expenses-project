const express = require('express')
const app = express()
const api = require('./routes/api')
const Expense = require('./model/Expense')
const bodyParser = require('body-parser')
app.use(bodyParser.json())


const mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/mydatabase", {
  useNewUrlParser: true,
}).catch((err)=> console.log(err))

app.use('/', api)

const port = 4200
app.listen(port, function () {
    console.log(`Running on port ${port}`)
})

