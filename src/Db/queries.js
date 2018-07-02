var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://eeimhhwwcnoqhu:4b6fef6f5e692c60cdbc8012c3345fdbe09084ed26183166937f47b7adfcebff@ec2-54-235-196-250.compute-1.amazonaws.com:5432/ddco2e1nd4qb5k';
var db = pgp(connectionString);

// add query functions

module.exports = {
  getAllCards: getAllCards,
  createCard: createCard,
  updateCard: updateCard,
  removeCard: removeCard
};