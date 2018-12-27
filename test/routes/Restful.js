const env = require('../config/env');
const should = env.should();
const stringHelper = require('../../helper/stringHelper');

let idSample;

function checkErrors(err) {
  if(err) throw new Error(err);
}

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

  //not obj
  _request() {
    return env.chai.request(env.express);
  }

  _post() {
    return this._request().post(this.path);
  }

  _getDefaultValues(props = this.properties) {
    let values = {};
    props.forEach(prop =>
      values[prop.name] = prop.defaultValue
    );
    return values;
  }

  //not obj
  _shouldHasStatus(res, status) {
    res.should.has.status(status);
  }

  //not obj
  _shouldHaveProperties(object, properties) {
    properties.forEach(prop => {
      if(prop.relational)
        return object.should.have.property(prop.name).eql(prop.defaultValue._id.toString());

      if(prop.name === 'date') {
        const objDate = new Date(object[prop.name]);
        const defDate = new Date(prop.defaultValue);
        return objDate.should.be.eql(defDate);
      }
      object.should.have.property(prop.name).eql(prop.defaultValue);
    });
  }

  //not obj
  _shouldHasObj(res, object) {
    res.body.should.have.property(object);
  }

  test() {
    describe(`## ${stringHelper.capitalize(this.name)} route`, () => {
      describe(`### Create ${this.name}`, () => {
        it(`Success to create ${this.name}`, done => {
          this._post()
          .set('x-access-token', this.tokens.create)
          .send(this._getDefaultValues())
          .end((err, res) => {
            checkErrors(err);
  
            // create response class
            this._shouldHasStatus(res, 201);
            this._shouldHasObj(res, 'result');
            this._shouldHaveProperties(res.body.result, this.properties);
            idSample = res.body.result._id;
  
            done();
          });
        });
  
        it(`Try to create ${this.name} with no token`, done => {
          this._post()
          .send(this._getDefaultValues())
          .end((err, res) => {
            checkErrors(err);
  
            this._shouldHasStatus(res, 403);
            this._shouldHaveProperties(res.body, [
              {name: 'auth', defaultValue: false},
              {name: 'errors', defaultValue: 'Token not provided.'}
            ]);
            
            done();
          });
        });
  
        it(`Try to create ${this.name} with no permission`, done => {
          this._post()
          .set('x-access-token', this.tokens.none)
          .send(this._getDefaultValues())
          .end((err, res) => {
            checkErrors(err);
  
            this._shouldHasStatus(res, 403);
            this._shouldHaveProperties(res.body, [
              { name: 'errors', defaultValue: 'User has no permission' }
            ]);
  
            done();
          });
        });
  
        describe(`Try to create ${this.name} with no required values`, () => {
          this.properties.forEach(property => {
            if(property.required) {
              it(`Try to create ${this.name} with no ${property.name} property`, propDone => {
                let propertiesToPost = this.properties.filter(prop => {
                  if(prop !== property) return true
                });
  
                this._post()
                  .set('x-access-token', this.tokens.create)
                  .send(this._getDefaultValues(propertiesToPost))
                  .end((err, res) => {
                    checkErrors(err);
  
                    this._shouldHasStatus(res, 422);
                    res.body.should.have.property('errors');
                    
                    const errors = res.body.errors[0];
                    errors.should.have.property('location').eql('body');
                    errors.should.have.property('param').eql(property.name);
                    errors.should.have.property('msg').eql(`${stringHelper.capitalize(property.name)} is required`);
                    
                    propDone();
                  });
              });
            }
          });
        });
      });
  
      describe(`### Get all ${this.name}`, () => {
        it(`Success to get all ${this.name}`, done => {
          this._request()
            .get(this.path)
            .set('x-access-token', this.tokens.read)
            .end((err, res) => {
              checkErrors(err);
    
              this._shouldHasStatus(res, 200);
              this._shouldHasObj(res, 'result');
    
              const createdAccount = res.body.result[0];
              this.properties.forEach(prop => {
                if(prop.relational)
                  return createdAccount.should.have.property(prop.name).eql(prop.defaultValue._id.toString());
          
                if(prop.name === 'date') {
                  const objDate = new Date(createdAccount[prop.name]);
                  const defDate = new Date(prop.defaultValue);
                  return objDate.should.be.eql(defDate);
                }
                createdAccount.should.have.property(prop.name).eql(prop.defaultValue);
              });
  
              done();
            });
        });
        
        it(`Try to get ${this.name} with no token`, done => {
          this._request()
            .get(this.path)
            .set('x-access-token', this.tokens.none)
            .end((err, res) => {
              checkErrors(err);
    
              this._shouldHasStatus(res, 403);
              this._shouldHaveProperties(res.body, [
                { name: 'errors', defaultValue: 'User has no permission' }
              ]);
  
              done();
            });
        });
  
        it(`Try to get ${this.name} with no permission`, done => {
          env.chai.request(env.express)
            .get(this.path)
            .end((err, res) => {
              checkErrors(err);
    
              this._shouldHasStatus(res, 403);
              this._shouldHaveProperties(res.body, [
                {name: 'auth', defaultValue: false},
                {name: 'errors', defaultValue: 'Token not provided.'}
              ]);
    
              done();
            });
        });
  
      });
  
      describe(`### Get ${this.name} by id`, () => {
        it(`Success to get ${this.name}`, done => {
          this._request()
            .get(`${this.path}/${idSample}`)
            .set('x-access-token', this.tokens.read)
            .end((err, res) => {
              checkErrors(err);
  
              this._shouldHasStatus(res, 200);
  
              this._shouldHasObj(res, 'result');
              this._shouldHaveProperties(res.body.result, this.properties);
  
              done();
            });
        });
  
        it(`Try to get ${this.name} with no token`, done => {
          this._request()
            .get(`${this.path}/${idSample}`)
            .end((err, res) => {
              checkErrors(err);
  
              this._shouldHasStatus(res, 403);
              this._shouldHaveProperties(res.body, [
                {name: 'auth', defaultValue: false},
                {name: 'errors', defaultValue: 'Token not provided.'}
              ]);
              
              done();
            });
        });
  
        it(`Try to get ${this.name} with no permission`, done => {
          this._request()
            .get(`${this.path}/${idSample}`)
            .set('x-access-token', this.tokens.none)
            .end((err, res) => {
              checkErrors(err);
  
              this._shouldHasStatus(res, 403);
              this._shouldHaveProperties(res.body, [
                { name: 'errors', defaultValue: 'User has no permission' }
              ]);
  
              done();
            });
        });
      });
  
      describe(`### Update ${this.name} by id`, () => {
        it(`Success to update ${this.name}`, done => {
          this._request()
            .put(`${this.path}/${idSample}`)
            .set('x-access-token', this.tokens.update)
            .end((err, res) => {
              checkErrors(err);
  
              this._shouldHasStatus(res, 201);
              this._shouldHaveProperties(res.body, [
                { name: 'message', defaultValue: `${stringHelper.capitalize(this.name)} update successfully`}
              ]);
  
              done();
            });
        });
  
        it(`Try to update ${this.name} with no token`, done => {
          this._request()
            .put(`${this.path}/${idSample}`)
            .end((err, res) => {
              checkErrors(err);
  
              this._shouldHasStatus(res, 403);
              this._shouldHaveProperties(res.body, [
                {name: 'auth', defaultValue: false},
                {name: 'errors', defaultValue: 'Token not provided.'}
              ]);
  
              done();
            });
        });
  
        it(`Try to update ${this.name} with no permission`, done => {
          this._request()
            .put(`${this.path}/${idSample}`)
            .set('x-access-token', this.tokens.none)
            .end((err, res) => {
              checkErrors(err);
  
              this._shouldHasStatus(res, 403);
              this._shouldHaveProperties(res.body, [
                { name: 'errors', defaultValue: 'User has no permission' }
              ]);
  
              done();
            });
        });
      });
  
      describe(`### Delete ${this.name} by id`, () => {
        it(`Success to delete ${this.name}`, done => {
          this._request()
            .delete(`${this.path}/${idSample}`)
            .set('x-access-token', this.tokens.delete)
            .end((err, res) => {
              checkErrors(err);
  
              this._shouldHasStatus(res, 201);
              this._shouldHaveProperties(res.body, [
                { name: 'message', defaultValue: `${stringHelper.capitalize(this.name)} id: ${idSample} deleted successfully` }
              ]);
  
              done();
            });
        });
  
        it(`Try to delete ${this.name} with no token`, done => {
          this._request()
            .delete(`${this.path}/${idSample}`)
            .end((err, res) => {
              checkErrors(err);
  
              this._shouldHasStatus(res, 403);
              this._shouldHaveProperties(res.body, [
                {name: 'auth', defaultValue: false},
                {name: 'errors', defaultValue: 'Token not provided.'}
              ]);
  
              done();
            });
        });
  
        it(`Try to delete ${this.name} with no permission`, done => {
          this._request()
            .delete(`${this.path}/${idSample}`)
            .set('x-access-token', this.tokens.none)
            .end((err, res) => {
              checkErrors(err);
  
              this._shouldHasStatus(res, 403);
              this._shouldHaveProperties(res.body, [
                { name: 'errors', defaultValue: 'User has no permission' }
              ]);
  
              done();
            });
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
   * Test update account by id
   */
  describe('### Update account by id', () => {
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
  });
}