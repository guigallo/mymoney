const env = require('../config/env');
const Category = require('../../models/Category');
const sample = require('../sample/userSample');
const should = env.should();

let idSample;
let createToken;
let readToken;
let updateToken;
let deleteToken;
let noneToken;

module.exports = describe('Category routes', () => {
  before(done => {
    sample.createUsers('category').then(() => {
      sample.getToken('category', 'create').then(token => createToken = token);
      sample.getToken('category', 'read').then(token => readToken = token);
      sample.getToken('category', 'update').then(token => updateToken = token);
      sample.getToken('category', 'delete').then(token => deleteToken = token);
      sample.getToken('category', 'none').then(token => noneToken = token);
      done();
    })
    .catch(err => console.log(err));
  });

  after(done => {
    Category.deleteMany({}, err => {
      done();
    })
  });

  /**
   * Test create category
   */
  describe('# Create category', () => {
    it('Success to create category', done => {
      env.chai.request(env.express)
        .post('/categories')
        .set('x-access-token', createToken)
        .send({ name: 'Category' })
        .end((err, res) => {
          if(err) console.log(err);

          res.should.has.status(201);
          res.body.should.have.property('result');

          const createdCategory = res.body.result;

          idSample = createdCategory._id;
          createdCategory.should.have.property('name').eql('Category');
          done();
        });
    });

    it('Try to create category with no token', done => {
      env.chai.request(env.express)
        .post('/categories')
        .send({ name: 'Category' })
        .end((err, res) => {
          if(err) console.log(err);

          res.should.has.status(403);
          res.body.should.have.property('auth').eql(false);
          res.body.should.have.property('errors').eql('Token not provided.');
          done();
        });
    });

    it('Try to create category with no permission', done => {
      env.chai.request(env.express)
        .post('/categories')
        .set('x-access-token', noneToken)
        .send({ name: 'Category' })
        .end((err, res) => {
          if(err) console.log(err);

          res.should.has.status(403);
          res.body.should.have.property('errors').eql('User has no permission');

          done();
        });
    });

    it('Fail to create category with no name', done => {
      env.chai.request(env.express)
        .post('/categories')
        .set('x-access-token', createToken)
        .send({ })
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
  });

  /**
   * Test get all categories
   */
  describe('# Get all categories', () => {
    it('Success to get all category', done => {
      env.chai.request(env.express)
        .get('/categories')
        .set('x-access-token', readToken)
        .end((err, res) => {
          if(err) console.log(err);

          res.should.has.status(200);
          res.body.should.have.property('result');

          const createdCategory = res.body.result[0];
          createdCategory.should.have.property('name').eql('Category');
          done();
        });
    });

    it('Try to get categories with no token', done => {
      env.chai.request(env.express)
        .get('/categories')
        .set('x-access-token', noneToken)
        .end((err, res) => {
          if(err) console.log(err);

          res.should.has.status(403);
          res.body.should.have.property('errors').eql('User has no permission');

          done();
        });
    });

    it('Try to get categories with no permission', done => {
      env.chai.request(env.express)
        .get('/categories')
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
   * Test get category by id
   */
  describe('# Get category by id', () => {
    it('Success to get category', done => {
      env.chai.request(env.express)
        .get(`/categories/${idSample}`)
        .set('x-access-token', readToken)
        .end((err, res) => {
          if(err) console.log(err);

          res.should.has.status(200);
          res.body.should.have.property('result');
          res.body.result.should.have.property('name').eql('Category');
          done();
        });
    });

    it('Try to get category with no token', done => {
      env.chai.request(env.express)
        .get(`/categories/${idSample}`)
        .end((err, res) => {
          if(err) console.log(err);

          res.should.has.status(403);
          res.body.should.have.property('auth').eql(false);
          res.body.should.have.property('errors').eql('Token not provided.');
          done();
        });
    });

    it('Try to get category with no permission', done => {
      env.chai.request(env.express)
        .get(`/categories/${idSample}`)
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
   * Test update category by id
   */
  describe('# Update category by id', () => {
    it('Success to update category', done => {
      env.chai.request(env.express)
        .put(`/categories/${idSample}`)
        .set('x-access-token', updateToken)
        .send({ name: 'Category Updated' })
        .end((err, res) => {
          if(err) console.log(err);

          res.should.has.status(201);
          res.body.should.have.property('message').eql('Category update successfully');
          done();
        });
    });

    it('Try to update category with no token', done => {
      env.chai.request(env.express)
        .put(`/categories/${idSample}`)
        .send({ name: 'Category Updated' })
        .end((err, res) => {
          if(err) console.log(err);

          res.should.has.status(403);
          res.body.should.have.property('errors').eql('Token not provided.');
          done();
        });
    });

    it('Try to update category with no permission', done => {
      env.chai.request(env.express)
        .put(`/categories/${idSample}`)
        .set('x-access-token', noneToken)
        .send({ name: 'Category Updated' })
        .end((err, res) => {
          if(err) console.log(err);

          res.should.has.status(403);
          res.body.should.have.property('errors').eql('User has no permission');
          done();
        });
    });
  });


  /**
   * Test delete category by id
   */
  describe('# Delete category by id', () => {
    it('Success to delete category', done => {
      env.chai.request(env.express)
        .del(`/categories/${idSample}`)
        .set('x-access-token', deleteToken)
        .end((err, res) => {
          if(err) console.log(err);

          res.should.has.status(201);
          res.body.should.have.property('message').eql('Category deleted successfully');
          done();
        })
    });

    it('Try to delete category with no token', done => {
      env.chai.request(env.express)
        .del(`/categories/${idSample}`)
        .end((err, res) => {
          if(err) console.log(err);

          res.should.has.status(403);
          res.body.should.have.property('errors').eql('Token not provided.');
          done();
        })
    });

    it('Try to delete category with no permission', done => {
      env.chai.request(env.express)
        .del(`/categories/${idSample}`)
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