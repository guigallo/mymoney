const users = require('./sample/userSample');
const accounts = require('./sample/accountSample');
const categories = require('./sample/categorySample');
const expenses = require('./sample/expenseSample');
const Restful = require('./routes/Restful');
//const accountTest = require('./routes/accountsTest');
//const categoriesTest = require('./routes/categoriesTest');
//const loginoutTest = require('./routes/loginoutTest');

let accountCreated;
let accountToTransfer;
let categoryCreated;

clearDb = () => 
  new Promise(async resolve => {
    await users.clear();
    await accounts.clear();
    await categories.clear();
    await expenses.clear();

    resolve();
  })

describe('# Testing mymoney API', () => {
  before(done => {
    new Promise(async resolve => {
      await clearDb();
      await users.createMany(['account', 'category', 'expense', 'income', 'transfer', 'creditcard']);
      accountCreated = await accounts.createOne();
      accountToTransfer = await accounts.createOne();
      categoryCreated = await categories.createOne();
      resolve(done);
    }).then(() => done());
  });

  after(done => {
    clearDb()
      .then(() => done())
      .catch(err => { throw new Error(err) });
  });

  describe('## Testing routes', () => {
    it('Restful account routes', done => {
      users.getTokens('account')
        .then(tokens => {
          const restfulAcc = new Restful({
            name: 'account', path: '/accounts'}, [
              { name: 'name', defaultValue: 'Corrente', required: true },
              { name: 'value', defaultValue: 102, required: true }
            ], tokens);
          restfulAcc.test();
        })
        .then(() => done())
    });

    it('Restful category routes', done => {
      users.getTokens('category')
        .then(tokens => {
          const restfulCat = new Restful(
            { name: 'category', path: '/categories' }, [
              { name: 'name', defaultValue: 'Categoria', required: true }
            ], tokens);
            restfulCat.test();
        })
        .then(() => done())
    });

    it('Restful expense routes', done => {
      users.getTokens('expense')
        .then(tokens => {
          const restfulExpense = new Restful(
            { name: 'expense', path: '/expenses' }, [
              { name: 'account', defaultValue: accountCreated, required: true, relational: true },
              { name: 'category', defaultValue: categoryCreated, required: true, relational: true },
              { name: 'description', defaultValue: 'Despesa 01', required: true },
              { name: 'date', defaultValue: Date.now(), required: true },
              { name: 'value', defaultValue: 15.30, required: true },
              { name: 'paid', defaultValue: true },
            ], tokens
          );
          restfulExpense.test();
        })
        .then(() => done())
    });

    it('Restful income routes', done => {
      users.getTokens('income')
        .then(tokens => {
          const restfulExpense = new Restful(
            { name: 'income', path: '/incomes' }, [
              { name: 'account', defaultValue: accountCreated, required: true, relational: true },
              { name: 'category', defaultValue: categoryCreated, required: true, relational: true },
              { name: 'description', defaultValue: 'Receita 01', required: true },
              { name: 'date', defaultValue: Date.now(), required: true },
              { name: 'value', defaultValue: 5000, required: true },
              { name: 'paid', defaultValue: true },
            ], tokens
          );
          restfulExpense.test();
        })
        .then(() => done())
    });

    it('Restful transfer routes', done => {
      users.getTokens('transfer')
        .then(tokens => {
          const restfulExpense = new Restful(
            { name: 'transfer', path: '/transfers' }, [
              { name: 'accountOut', defaultValue: accountCreated, required: true, relational: true },
              { name: 'accountIn', defaultValue: accountToTransfer, required: true, relational: true },
              { name: 'date', defaultValue: Date.now(), required: true },
              { name: 'value', defaultValue: 50, required: true },
            ], tokens
          );
          restfulExpense.test();
        })
        .then(() => done())
    });

    it('Restful credit card routes', done => {
      users.getTokens('creditcard')
        .then(tokens => {
          const restfulExpense = new Restful(
            { name: 'creditCard', path: '/creditcards' }, [
              { name: 'name', defaultValue: 'visa', required: true },
              { name: 'limit', defaultValue: 2400, required: true },
              { name: 'closingDay', defaultValue: 7, required: true },
              { name: 'dueDate', defaultValue: 15, required: true },
              { name: 'account', defaultValue: accountCreated, required: true, relational: true },
            ], tokens
          );
          restfulExpense.test();
        })
        .then(() => done())
    });

  })
});