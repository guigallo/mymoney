const sample = require('./sample/userSample');
const Restful = require('./routes/Restful');
//const accountTest = require('./routes/accountsTest');
//const categoriesTest = require('./routes/categoriesTest');
//const loginoutTest = require('./routes/loginoutTest');


let users;

describe('# Testing mymoney API', () => {
  before(done => {
    sample.createUsers(['account', 'category'])
      .then(() => done())
      .catch(err => { throw new Error(err) });
  });

  after(done => {
    sample.deleteUsers()
      .then(() => done())
      .catch(err => { throw new Error(err) });
  });

  describe('## Testing routes', () => {
    it('Restful account routes', done => {
      sample.getTokens('account')
        .then(tokens => {
          const restfulAcc = new Restful({
            name: 'account', path: '/accounts'}, [
              { name: 'name', defaultValue: 'Corrente', required: true },
              { name: 'value', defaultValue: 102, required: true }
            ], tokens);
          restfulAcc.test();
        })
        .then(() => done())
      }
    );

    it('Restful category routes', done => {
      sample.getTokens('category')
        .then(tokens => {
          const restfulAcc = new Restful({
            name: 'category', path: '/categories'}, [
              { name: 'name', defaultValue: 'Categoria', required: true }
            ], tokens);
          restfulAcc.test();
        })
        .then(() => done())
      }
    );

    //it
  })
});



/*
accountTest;
categoriesTest;
loginoutTest;
*/