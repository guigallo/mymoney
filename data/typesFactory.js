function createType(id, name, balance, description) {
  return { id, name, balance, description }
}

const typesArray = [
  createType(0, 'income', 'in', 'Income'),
  createType(1, 'expense', 'out', 'Expense'),
  createType(2, 'transferIn', 'in', 'Transfer between accounts'),
  createType(3, 'transferOut', 'out', 'Transfer between accounts'),
  createType(4, 'credit', 'none', 'Credit card transaction'),
  createType(5, 'invoice', 'out', 'Credit card invoice'),
  createType(6, 'manualIn', 'in', 'Manual balance change'),
  createType(7, 'manualOut', 'out', 'Manual balance change'),
];

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
    return typesArray.find(type => {
      if(type.name === name) return type;
    });
  }
}