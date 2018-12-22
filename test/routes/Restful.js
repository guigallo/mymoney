const env = require('../config/env');
const should = env.should();

let idSample;

class Restful {
  constructor(route, properties, tokens) {
    if(!route.hasOwnProperty('name'))
      throw new Error('property name of route param is required');
    if(!route.hasOwnProperty('path'))
      throw new Error('property path of route param is required');
    
    this.name = route.name;
    this.path = route.path;
    this.tokens = tokens;
    this.properties = properties;
  }

  _request() {
    return env.chai.request(env.express);
  }

  _post() {
    return this._request().post(this.path);
  }

  _getDefaultValues() {
    let values = {};
    this.properties.forEach(prop =>
      values[prop.property] = prop.defaultValue
    );
    return values;
  }

  _shoulHasStatus(res, status) {
    res.should.has.status(status);
  }

  _shouldHaveProperties(object, properties) {
    properties.forEach(prop => 
      object.should.have.property(prop.property).eql(prop.defaultValue)
    );
  }

  _shouldHasObj(res, object) {
    res.body.should.have.property(object);
  }

  create() {
    describe(`### Create ${this.name}`, () => {
      it(`Success to create ${this.name}`, done => {
        this._post()
        .set('x-access-token', this.tokens.create)
        .send(this._getDefaultValues())
        .end((err, res) => {
          if(err) throw new Error(err);

          // create response class
          this._shoulHasStatus(res, 201);
          this._shouldHasObj(res, 'result')
          this._shouldHaveProperties(res.body.result, this.properties)
          idSample = res.body.result._id;

          done();
        });
      });

      it(`Try to create ${this.name} with no token`, done => {
        this._post()
        .send(this._getDefaultValues())
        .end((err, res) => {
          if(err) throw new Error(err);

          this._shoulHasStatus(res, 403);
          this._shouldHaveProperties(res.body, [
            {property: 'auth', defaultValue: false},
            {property: 'errors', defaultValue: 'Token not provided.'}
          ]);
          
          done();
        });
      });
    });
  }
}
module.exports = Restful;

//module.exports = tokens =>  {
function defaultTest (tokens) {
  /**
   * Test create account
   */
  describe('### Create account', () => {
    it('Success to create account', done => { //done
      env.chai.request(env.express)
        .post('/accounts')
        .set('x-access-token', tokens.create)
        .send({
          name: 'Corrente',
          value: 101,
        })
        .end((err, res) => {
          if(err) console.log(err);

          res.should.has.status(201);
          res.body.should.have.property('result');

          const createdAccount = res.body.result;

          idSample = createdAccount._id;
          createdAccount.should.have.property('name').eql('Corrente');
          createdAccount.should.have.property('value').eql(101);
          done();
        });
    });

    it('Try to create account with no token', done => { //done
      env.chai.request(env.express)
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
      env.chai.request(env.express)
        .post('/accounts')
        .set('x-access-token', tokens.none)
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
      env.chai.request(env.express)
        .post('/accounts')
        .set('x-access-token', tokens.create)
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
      env.chai.request(env.express)
        .post('/accounts')
        .set('x-access-token', tokens.create)
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
      env.chai.request(env.express)
        .post('/accounts')
        .set('x-access-token', tokens.create)
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
      env.chai.request(env.express)
        .post('/accounts')
        .set('x-access-token', tokens.create)
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
  describe('### Get all accounts', () => {
    it('Success to get all account', done => {
      env.chai.request(env.express)
        .get('/accounts')
        .set('x-access-token', tokens.read)
        .end((err, res) => {
          if(err) console.log(err);

          res.should.has.status(200);
          res.body.should.have.property('result');

          const createdAccount = res.body.result[0];
          createdAccount.should.have.property('name').eql('Corrente');
          createdAccount.should.have.property('value').eql(101);
          done();
        });
    });

    it('Try to get accounts with no token', done => {
      env.chai.request(env.express)
        .get('/accounts')
        .set('x-access-token', tokens.none)
        .end((err, res) => {
          if(err) console.log(err);

          res.should.has.status(403);
          res.body.should.have.property('errors').eql('User has no permission');

          done();
        });
    });

    it('Try to get accounts with no permission', done => {
      env.chai.request(env.express)
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
  describe('### Get account by id', () => {
    it('Success to get account', done => {
      env.chai.request(env.express)
        .get(`/accounts/${idSample}`)
        .set('x-access-token', tokens.read)
        .end((err, res) => {
          if(err) console.log(err);

          res.should.has.status(200);
          res.body.should.have.property('result');
          res.body.result.should.have.property('name').eql('Corrente');
          res.body.result.should.have.property('value').eql(101);
          done();
        });
    });

    it('Try to get account with no token', done => {
      env.chai.request(env.express)
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
      env.chai.request(env.express)
        .get(`/accounts/${idSample}`)
        .set('x-access-token', tokens.none)
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
  describe('### Update account by id', () => {
    it('Success to update account', done => {
      env.chai.request(env.express)
        .put(`/accounts/${idSample}`)
        .set('x-access-token', tokens.update)
        .send({ name: 'Corrente Updated' })
        .end((err, res) => {
          if(err) console.log(err);

          res.should.has.status(201);
          res.body.should.have.property('message').eql('Account update successfully');
          done();
        });
    });

    it('Try to update account value', done => {
      env.chai.request(env.express)
        .put(`/accounts/${idSample}`)
        .set('x-access-token', tokens.update)
        .send({ value: 123 })
        .end((err, res) => {
          if(err) console.log(err);

          res.should.has.status(400);
          res.body.should.have.property('errors').eql('Not implemented to change value');
          done();
        });
    });

    it('Try to update account with no token', done => {
      env.chai.request(env.express)
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
      env.chai.request(env.express)
        .put(`/accounts/${idSample}`)
        .set('x-access-token', tokens.none)
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
  describe('### Delete account by id', () => {
    it('Success to delete account', done => {
      env.chai.request(env.express)
        .del(`/accounts/${idSample}`)
        .set('x-access-token', tokens.delete)
        .end((err, res) => {
          if(err) console.log(err);

          res.should.has.status(201);
          res.body.should.have.property('message').eql('Account deleted successfully');
          done();
        })
    });

    it('Try to delete account with no token', done => {
      env.chai.request(env.express)
        .del(`/accounts/${idSample}`)
        .end((err, res) => {
          if(err) console.log(err);

          res.should.has.status(403);
          res.body.should.have.property('errors').eql('Token not provided.');
          done();
        })
    });

    it('Try to delete account with no permission', done => {
      env.chai.request(env.express)
        .del(`/accounts/${idSample}`)
        .set('x-access-token', tokens.none)
        .end((err, res) => {
          if(err) console.log(err);

          res.should.has.status(403);
          res.body.should.have.property('errors').eql('User has no permission');
          done();
        })
    });
  });
}