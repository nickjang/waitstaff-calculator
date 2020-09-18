import store from './store.js';
import waitstaffCalculator from './waitstaff-calculator.js';

const main = function () {
  waitstaffCalculator.bindEventListeners();
  waitstaffCalculator.render();
};

$(main);