const sample = require('./sample/userSample');
const Restful = require('./routes/Restful');
const accountTest = require('./routes/accountsTest');
//const categoriesTest = require('./routes/categoriesTest');
//const loginoutTest = require('./routes/loginoutTest');


let users;

describe('# Testing mymoney API', () => {
  before(done => {
    sample.createUsers('account')
      .then(() => done())
      .catch(err => { throw new Error(err) });
  });

  after(done => {
    sample.deleteUsers()
      .then(() => done())
      .catch(err => { throw new Error(err) });
  });

  describe('## Testing routes', () => {
    /*
    it('Will test accounts', done => {
      sample.getTokens('account')
        .then(tokens => accountTest(tokens))
        .then(() => done())
      }
    );*/
    it('Will test accounts', done => {
      sample.getTokens('account')
        .then(tokens => {
          const restfulAcc = new Restful({
            name: 'account', path: '/accounts'}, [
              { property: 'name', defaultValue: 'Corrente' },
              { property: 'value', defaultValue: 102 }
            ], tokens);
          restfulAcc.create();
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