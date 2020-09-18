let subtotal = 0;
let tip = 0;
let tipTotal = 0;
let mealCount = 0;

function getSubtotal() {
  return subtotal.toFixed(2);
}

function getTip() {
  return tip.toFixed(2);
}

function getTotal() {
  return (subtotal + tip).toFixed(2);
}

function getTipTotal() {
  return tipTotal.toFixed(2);
}

function getMealCount() {
  return mealCount;
}

function getAverageTipPerMeal() {
  if (!mealCount) return 0;
  return (tipTotal / mealCount).toFixed(2);
}

function validateNumber(number) {
  if (typeof number !== "number") throw new Error("Enter number.");
}

function logMeal(base, tax, tipPercent) {
  if (validateNumber(base) &&
    validateNumber(tax) &&
    validateNumber(tipPercent)) {
    return;
  }
  tip = base * tipPercent / 100;
  subtotal = base * (1 + (tax / 100));
  tipTotal += tip;
  mealCount++;
}

function reset() {
  subtotal = 0;
  tip = 0;
  tipTotal = 0;
  mealCount = 0;
}

export default {
  getSubtotal,
  getTip,
  getTotal,
  getTipTotal,
  getMealCount,
  getAverageTipPerMeal,
  validateNumber,
  logMeal,
  reset
};