const helper = require('../helper/testHelper');
const Account = require('../models/Account');

describe('Account routes', () => {
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
        .send({
          name: 'Corrente',
          value: 101,
        })
        .end((err, res) => {
          if(err) logger.info(err);

          console.log(err);

          res.should.has.status(201);
          res.body.should.have.property('account');

          const createdAccount = res.body.account;
          createdAccount.should.have.property('name').eql('Corrente');
          createdAccount.should.have.property('value').eql(101);
          done();
        });
    });
  });
});