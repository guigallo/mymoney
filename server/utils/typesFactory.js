function createType(id, name, balance, description) {
  return { id, name, balance, description }
}

module.exports = {
  schemaTrasactionType() {
    return {
      id: Number,
      name: String,
      balance: String,
      description: String
    }
  },

  createTrasactionType(name) {
    switch(name){
      // create array and find.
      case 'income':
        return createType(0, name, 'in', 'Income');
      case 'expense':
        return createType(1, name, 'out', 'Expense');
      case 'transferIn':
        return createType(2, name, 'in', 'Transfer between accounts');
      case 'transferOut':
        return createType(3, name, 'out', 'Transfer between accounts');
      case 'credit':
        return createType(4, name, 'none', 'Credit card transaction');
      case 'invoice':
        return createType(5, name, 'out', 'Credit card invoice');
      case 'manualIn':
        return createType(6, name, 'in', 'Manual balance change');
      case 'manualOut':
        return createType(7, name, 'out', 'Manual balance change');
      default:
        throw new Error('Invalid type name');
    }
  }
}

/*
const test = [
  createType('income', 'in', 'Income'),
  createType('expense', 'out', 'Expense'),
  createType('transferIn', 'in', 'Transfer between accounts'),
  createType('transferOut', 'out', 'Transfer between accounts'),
  createType('credit', 'none', 'Credit card transaction'),
  createType('invoice', 'out', 'Credit card invoice'),
  createType('manualIn', 'in', 'Manual balance change'),
  createType('manualOut', 'out', 'Manual balance change'),
];
*/