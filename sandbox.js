const Expense = require('./models/Expense');
const AccModel = require('./models/Account');
const CateModel = require('./models/Category');
const db = require('./db/db');

let account;

const acc = {
  name: 'Corrente',
  value: 102,
  teste: 1234
}
const categ = {
  name: 'Alimencatacao'
}

//////////////
new Promise(accResolve => AccModel.create(acc, (err, created) => accResolve(created)))
  .then(accountCreated => {
    account = accountCreated;

    CateModel.create(categ, (err, category) => {
      const exp = new Expense(account, category, 'Despesa', Date.now(), 15, true);
      exp.save()
        .then(saved => console.log(saved));
      /*
      Expense.Model.create(exp, (err, created) => {
        console.log(err);
        console.log(created);
      });*/
  })


})

////////////////
/*
const exp = new Expense({
  name: 'Corrente',
  value: 102,
  teste: 1234
}, {
  name: 'Alimencatacao'
}, 'Despesa', Date.now(), 15, true);

Expense.Model.create(exp, (err, created) => {
  console.log(err);
  console.log(created);
})
*/