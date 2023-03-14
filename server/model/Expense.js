const mongoose = require('mongoose')
const Schema = mongoose.Schema

const expenseSchema = new mongoose.Schema({
item: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  group: {
    type: String,
    required: true,
  },
})

const Expense = mongoose.model('Expense', expenseSchema)

module.exports = Expense