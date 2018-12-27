const model = require ('../../models/Account');

module.exports = {
  createOne() {
    return new Promise(resolve => {
      model.create({ name: 'Corrente', value: 102 }, (err, created) => {
        if(err) throw new Error('Fail to create account');
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