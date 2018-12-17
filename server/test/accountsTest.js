const helper = require('../helper/testHelper');
const Account = require('../models/Account');
const sample = require('./sample/accountSample');

let idSample;
let createToken;
let readToken;
let updateToken;
let deleteToken;
let noneToken;

describe('Account routes', () => {
  before(done => {
    sample.createUsers().then(() => {
      sample.getToken('create').then(token => createToken = token);
      sample.getToken('read').then(token => readToken = token);
      sample.getToken('update').then(token => updateToken = token);
      sample.getToken('delete').then(token => deleteToken = token);
      sample.getToken('none').then(token => noneToken = token);
      done();
    })
    .catch(err => console.log(err));
  });

  after(done => {
    Account.deleteMany({}, err => {
      done();
    })
  });

  /**
   * Test create account
   */
  describe('# Create account', () => {
    it('Success to create account', done => {
      helper.chai.request(helper.express)
        .post('/accounts')
        .set('x-access-token', createToken)
        .send({
          name: 'Corrente',
          value: 101,
        })
        .end((err, res) => {
          if(err) console.log(err);

          res.should.has.status(201);
          res.body.should.have.property('account');

          const createdAccount = res.body.account;

          idSample = createdAccount._id;
          createdAccount.should.have.property('name').eql('Corrente');
          createdAccount.should.have.property('value').eql(101);
          done();
        });
    });

    it('Try to create account with no token', done => {
      helper.chai.request(helper.express)
        .post('/accounts')
        .send({
          name: 'Corrente',
          value: 101,
        })
        .end((err, res) => {
          if(err) console.log(err);

          res.should.has.status(403);
          res.body.should.have.property('auth').eql(false);
          res.body.should.have.property('errors').eql('Token not provided.');
          done();
        });
    });

    it('Try to create account with no permission', done => {
      helper.chai.request(helper.express)
        .post('/accounts')
        .set('x-access-token', noneToken)
        .send({
          name: 'Corrente',
          value: 101,
        })
        .end((err, res) => {
          if(err) console.log(err);

          res.should.has.status(403);
          res.body.should.have.property('errors').eql('User has no permission');

          done();
        });
    });

    it('Fail to create account with no name', done => {
      helper.chai.request(helper.express)
        .post('/accounts')
        .set('x-access-token', createToken)
        .send({ value: 101 })
        .end((err, res) => {
          if(err) logger.info(err);
          
          res.should.has.status(422);
          res.body.should.have.property('errors');

          const errors = res.body.errors[0];
          errors.should.have.property('location').eql('body');
          errors.should.have.property('param').eql('name');
          errors.should.have.property('msg').eql('Name is required');
          done();
        });
    });

    it('Fail to create account with no value', done => {
      helper.chai.request(helper.express)
        .post('/accounts')
        .set('x-access-token', createToken)
        .send({ name: 'Corrente' })
        .end((err, res) => {
          if(err) logger.info(err);
          
          res.should.has.status(422);
          res.body.should.have.property('errors');

          const errors = res.body.errors[0];
          errors.should.have.property('location').eql('body');
          errors.should.have.property('param').eql('value');
          errors.should.have.property('msg').eql('Value is required');
          done();
        });
    });

    it('Fail to create account with negative value', done => {
      helper.chai.request(helper.express)
        .post('/accounts')
        .set('x-access-token', createToken)
        .send({ name: 'Corrente', value: -101 })
        .end((err, res) => {
          if(err) logger.info(err);
          
          res.should.has.status(422);
          res.body.should.have.property('errors');

          const errors = res.body.errors[0];
          errors.should.have.property('location').eql('body');
          errors.should.have.property('param').eql('value');
          errors.should.have.property('msg').eql('Value must be positive');
          done();
        });
    });

    it('Fail to create account with not number value', done => {
      helper.chai.request(helper.express)
        .post('/accounts')
        .set('x-access-token', createToken)
        .send({ name: 'Corrente', value: 'not number' })
        .end((err, res) => {
          if(err) logger.info(err);
          
          res.should.has.status(422);
          res.body.should.have.property('errors');

          const errors = res.body.errors[0];
          errors.should.have.property('location').eql('body');
          errors.should.have.property('param').eql('value');
          errors.should.have.property('msg').eql('Value must be numeric');
          done();
        });
    });
  });

  /**
   * Test get all accounts
   */
  describe('# Get all accounts', () => {
    it('Success to get all account', done => {
      helper.chai.request(helper.express)
        .get('/accounts')
        .set('x-access-token', readToken)
        .end((err, res) => {
          if(err) console.log(err);

          res.should.has.status(200);
          res.body.should.have.property('accounts');

          const createdAccount = res.body.accounts[0];
          createdAccount.should.have.property('name').eql('Corrente');
          createdAccount.should.have.property('value').eql(101);
          done();
        });
    });

    it('Try to get accounts with no token', done => {
      helper.chai.request(helper.express)
        .get('/accounts')
        .set('x-access-token', noneToken)
        .end((err, res) => {
          if(err) console.log(err);

          res.should.has.status(403);
          res.body.should.have.property('errors').eql('User has no permission');

          done();
        });
    });

    it('Try to get accounts with no permission', done => {
      helper.chai.request(helper.express)
        .get('/accounts')
        .end((err, res) => {
          if(err) console.log(err);

          res.should.has.status(403);
          res.body.should.have.property('auth').eql(false);
          res.body.should.have.property('errors').eql('Token not provided.');

          done();
        });
    });
  });

  /**
   * Test get account by id
   */
  describe('# Get account by id', () => {
    it('Success to get account', done => {
      helper.chai.request(helper.express)
        .get(`/accounts/${idSample}`)
        .set('x-access-token', readToken)
        .end((err, res) => {
          if(err) console.log(err);

          res.should.has.status(200);
          res.body.should.have.property('account');
          res.body.account.should.have.property('name').eql('Corrente');
          res.body.account.should.have.property('value').eql(101);
          done();
        });
    });

    it('Try to get account with no token', done => {
      helper.chai.request(helper.express)
        .get(`/accounts/${idSample}`)
        .end((err, res) => {
          if(err) console.log(err);

          res.should.has.status(403);
          res.body.should.have.property('auth').eql(false);
          res.body.should.have.property('errors').eql('Token not provided.');
          done();
        });
    });

    it('Try to get account with no permission', done => {
      helper.chai.request(helper.express)
        .get(`/accounts/${idSample}`)
        .set('x-access-token', noneToken)
        .end((err, res) => {
          if(err) console.log(err);

          res.should.has.status(403);
          res.body.should.have.property('errors').eql('User has no permission');
          done();
        });
    });
  });

  /**
   * Test update account by id
   */
  describe('# Update account by id', () => {
    it('Success to update account', done => {
      helper.chai.request(helper.express)
        .put(`/accounts/${idSample}`)
        .set('x-access-token', updateToken)
        .send({ name: 'Corrente Updated' })
        .end((err, res) => {
          if(err) console.log(err);

          res.should.has.status(201);
          res.body.should.have.property('message').eql('Account update successfully');
          done();
        });
    });

    it('Try to update account value', done => {
      helper.chai.request(helper.express)
        .put(`/accounts/${idSample}`)
        .set('x-access-token', updateToken)
        .send({ value: 123 })
        .end((err, res) => {
          if(err) console.log(err);

          res.should.has.status(400);
          res.body.should.have.property('errors').eql('Not implemented to change value');
          done();
        });
    });

    it('Try to update account with no token', done => {
      helper.chai.request(helper.express)
        .put(`/accounts/${idSample}`)
        .send({ name: 'Corrente Updated' })
        .end((err, res) => {
          if(err) console.log(err);

          res.should.has.status(403);
          res.body.should.have.property('errors').eql('Token not provided.');
          done();
        });
    });

    it('Try to update account with no permission', done => {
      helper.chai.request(helper.express)
        .put(`/accounts/${idSample}`)
        .set('x-access-token', noneToken)
        .send({ name: 'Corrente Updated' })
        .end((err, res) => {
          if(err) console.log(err);

          res.should.has.status(403);
          res.body.should.have.property('errors').eql('User has no permission');
          done();
        });
    });
  });


  /**
   * Test delete account by id
   */
  describe('# Delete account by id', () => {
    it('Success to delete account', done => {
      helper.chai.request(helper.express)
        .del(`/accounts/${idSample}`)
        .set('x-access-token', deleteToken)
        .end((err, res) => {
          if(err) console.log(err);

          res.should.has.status(201);
          res.body.should.have.property('message').eql('Account deleted successfully');
          done();
        })
    });

    it('Try to delete account with no token', done => {
      helper.chai.request(helper.express)
        .del(`/accounts/${idSample}`)
        .end((err, res) => {
          if(err) console.log(err);

          res.should.has.status(403);
          res.body.should.have.property('errors').eql('Token not provided.');
          done();
        })
    });

    it('Try to delete account with no permission', done => {
      helper.chai.request(helper.express)
        .del(`/accounts/${idSample}`)
        .set('x-access-token', noneToken)
        .end((err, res) => {
          if(err) console.log(err);

          res.should.has.status(403);
          res.body.should.have.property('errors').eql('User has no permission');
          done();
        })
    });
  });
});