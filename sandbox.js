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

/////////////
//_id: 5c241bf014af22171bdf18cc,
//account: 5c241bf014af22171bdf18ca,
//category: 5c241bf014af22171bdf18cb,

Expense.Model.findById('5c241bf014af22171bdf18cc', (err, acc2) => {
  console.log(acc2);
})

//////////////
/*
new Promise(accResolve => AccModel.create(acc, (err, created) => accResolve(created)))
  .then(accountCreated => {
    account = accountCreated;

    CateModel.create(categ, (err, category) => {
      const exp = new Expense({
        _id: account._id,
        name: account.name
      }, {
        _id: category._id,
        name: category.name
      }, 'Despesa', Date.now(), 15, true);
      exp.create()
        .then(saved => console.log(saved));
  })
})
*/

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