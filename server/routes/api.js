const express = require('express')
const router = express.Router()
const Expense = require('../model/Expense')
const moment = require('moment')

router.get('/expenses', function (req, res) {
    const { d1, d2 } = req.query
    if (!d1 && !d2) {
    Expense.find({}).sort({ date: -1 })
        .then((expenses) => {
            res.send(expenses)
        })
        .catch((err) => {
            console.error(err)
            res.status(500).send('Internal Server Error')
        })
}
else if (d1 && !d2) {
    const date1 = moment(d1).toDate()
    const date2 = new Date()
    Expense.find({ date: { $gte: date1, $lte: date2 } })
      .sort({ date: -1 })
      .then((expenses) => {
        res.send(expenses)
      })
      .catch((err) => {
        console.error(err)
        res.status(500).send('Internal Server Error')
      })
  }
  else if (d1 && d2) {
    const date1 = moment(d1).toDate()
    const date2 = moment(d2).toDate()
    Expense.find({ date: { $gte: date1, $lte: date2 } })
      .sort({ date: -1 })
      .then((expenses) => {
        res.send(expenses)
      })
      .catch((err) => {
        console.error(err)
        res.status(500).send('Internal Server Error')
      })
  }
})


router.post('/expense', function(req, res) {
    const { item, amount, date, group } = req.body
    const expenseDate = date ? moment(date).format('LLLL') : moment().format('LLLL')
  
    const newExpense = new Expense({
      item,
      amount,
      group,
      date: expenseDate
    })
  
    newExpense
      .save()
      .then((expense) => {
        console.log(`New expense of ${expense.amount} on ${expense.item} added!`)
        res.send(expense)
      })
      .catch((err) => {
        console.error(err)
        res.status(500).send('Internal Server Error')
      })
  })

  
router.put('/update', async function(req, res) {
    try {
      const { group1, group2 } = req.body
  
      const expense = await Expense.findOneAndUpdate({ group: group1 }, { group: group2 })
  
      if (!expense) {
        res.status(404).send(`No expenses found for group ${group1}`)
      } else {
        console.log(`Expense ${expense.item} group changed from ${group1} to ${group2}`)
        res.send(`Expense ${expense.item} group changed from ${group1} to ${group2}`)
      }
    } catch (error) {
      console.error(error)
      res.status(500).send('Internal Server Error')
    }
  })

  router.get('/expenses/:group', async function(req, res) {
    const { group } = req.params
    const { total } = req.query
  
    try {
      if (total === 'true') {
        const expenses = await Expense.aggregate([
          { $match: { group: group } },
          { $group: { _id: '$group', totalAmount: { $sum: '$amount' } } }
        ]);
        res.send(`Total expenses for ${group}: ${expenses[0].totalAmount}`)
      } else {
        const expenses = await Expense.find({ group: group })
        res.send(expenses)
      }
    } catch (error) {
      console.error(error)
      res.status(500).send('Internal Server Error')
    }
  })

module.exports = router
