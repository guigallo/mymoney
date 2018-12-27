const model = require ('../../models/Expense').Model;

module.exports = {
  clear() {
    return new Promise(resolve => 
      model.deleteMany({}, () => resolve())
    );
  }
}