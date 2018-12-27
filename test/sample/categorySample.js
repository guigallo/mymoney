const model = require ('../../models/Category');

module.exports = {
  createOne() {
    return new Promise(resolve => {
      model.create({ name: 'Categoria' }, (err, created) => {
        if(err) throw new Error('Fail to create category');
        resolve(created);
      });
    });
  },

  clear() {
    return new Promise(resolve => 
      model.deleteMany({}, () => resolve())
    );
  }
}