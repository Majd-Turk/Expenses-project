// const data = require('./routes/expenses.json');
// const Expense = require('./model/Expense');
// const mongoose = require('mongoose');

// mongoose.connect("mongodb://127.0.0.1:27017/mydatabase", {
//   useNewUrlParser: true,
// }).catch((err) => console.log(err));

// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log("Connected to database!");

//   const promises = data.map((item) => {
//     const newExpense = new Expense(item);
//     return newExpense.save()
//       .then((expense) => {
//         console.log(`Saved expense: ${expense.item}`);
//       })
//       .catch((err) => {
//         console.log(`Error saving expense: ${err}`);
//       });
//   });

//   Promise.all(promises)
//     .then(() => {
//       mongoose.connection.close();
//       console.log("Database connection closed.");
//     })
//     .catch((err) => {
//       console.log(`Error saving expenses: ${err}`);
//     });
// });
