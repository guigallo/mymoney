const model = require ('../../models/CreditCard').Model;

module.exports = {
  createOne(account) {
    return new Promise(resolve => {
      model.create({ 
        name: 'Visa',
        limit: 3000,
        closingDay: 7,
        duaDate: 15,
        account
      }, (err, created) => {
        if(err) throw new Error('Fail to create credit card');
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