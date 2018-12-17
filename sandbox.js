const typeFactory = require('./data/typesFactory');

console.log(typeFactory.createTrasactionType('income'))
console.log(typeFactory.createTrasactionType('expense'))
console.log(typeFactory.createTrasactionType('transferIn'))
console.log(typeFactory.createTrasactionType('transferOut'))
console.log(typeFactory.createTrasactionType('credit'))
console.log(typeFactory.createTrasactionType('invoice'))
console.log(typeFactory.createTrasactionType('manualIn'))
console.log(typeFactory.createTrasactionType('manualOut'))