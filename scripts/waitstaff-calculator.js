import store from './store.js';

let generateCustomerCharges = function (subtotal, tip, total) {
  return `
    <section class="box-outline">
      <h2>Customer Charges</h2>
      <hr>
      <div class="js-charges">
        <div class="group">
          <div class="item align-right">
            <p>Subtotal</p>
            <p>Tip</p>
          </div>
          <div class="item align-left">
            <p>${subtotal}</p>
            <p>${tip}</p>
          </div>
        </div>
        <hr class="subtotal">
        <div class="group">
          <div class="item align-right">
            <p>Total</p>
          </div>
          <div class="item align-left">
            <p>${total}</p>
          </div>
        </div>
      </div>
    </section>`;
};

let generateEarnings = function (tipTotal, mealCount, averageTip) {
  return `
    <section class="box-outline">
      <h2>My Earnings Info</h2>
      <hr>
      <div class="js-earnings">
        <div class="group">
          <div class="item-three align-right">
            <p>Tip Total:</p>
            <p>Meal Count:</p>
            <p>Average Tip Per Meal:</p>
          </div>
          <div class="item align-left">
            <p>${tipTotal}</p>
            <p>${mealCount}</p>
            <p>${averageTip}</p>
          </div>
        </div>
      </div>
    </section>`;
};

let generateBill = function () {
  return `
    <section class="item-four box-outline">
      <h2>Enter the Meal Details</h2>
      <hr>
      <form id="calculator-form" method="get">
        <div class="group-column">
          <div class="item-two">
            <div class="group">
              <div class="item">
                <div class="group-column align-right">
                  <label for="base-entry" class="item">Base Meal Price: $</label>
                  <label for="tax-entry" class="item">Tax Rate: % </label>
                  <label for="tip-entry" class="item">Tip Percentage: % </label>
                </div>
              </div>
              <div class="item">
                <div class="group-column align-left">
                  <input type="number" name="base-entry" placeholder="9.99" step=".01" required>
                  <input type="number" name="tax-entry" step="any" required>
                  <input type="number" name="tip-entry" step="any" required>
                </div>
              </div>
            </div>
          </div>
          <div class="item">
            <button type="submit" class="js-submit-button" form="calculator-form">Submit</button>
            <button type="reset" class="js-cancel-button" form="calculator-form">Cancel</button>
          </div>
        </div>
      </form>
    </section>`;
};

let generateCalculator = function (subtotal, tip, total, tipTotal, mealCount, averageTip) {
  let reportings;
  let calculator;
  let resetButton;
  reportings = `
    <div class="js-reportings item-three">
      ${generateCustomerCharges(subtotal, tip, total)}
      ${generateEarnings(tipTotal, mealCount, averageTip)}
    </div>`;
  resetButton = `
    <div class="align-right">
      <button type="reset" class="js-reset-button">Reset</button>
    </div>`;
  calculator = `
    <div class="group">
      ${generateBill()}
      ${reportings}
    </div>
    ${resetButton}`;

  return calculator;
};

let render = function () {
  let subtotal = store.getSubtotal();
  let tip = store.getTip();
  let total = store.getTotal();
  let tipTotal = store.getTipTotal();
  let mealCount = store.getMealCount();
  let averageTip = store.getAverageTipPerMeal();

  let calculator = generateCalculator(subtotal, tip, total, tipTotal, mealCount, averageTip);
  $('main').html(calculator);
};

let handleBillSubmit = function () {
  $('main').on('click', '.js-submit-button', event => {
    event.preventDefault();
    let base = parseFloat($('input[name=\'base-entry\']').val());
    let tax = parseFloat($('input[name=\'tax-entry\']').val());
    let tipPercent = parseFloat($('input[name=\'tip-entry\']').val());
    console.log(`${typeof base}`);
    console.log('base', base);
    console.log('tax', tax);
    console.log('tipPercent', tipPercent);

    store.logMeal(base, tax, tipPercent);
    render();
  });
};

let handleBillCancelClick = function () {
  $('main').on('click', '.js-cancel-button', event => {
    event.preventDefault();
    render();
  });
};

let handleResetClick = function () {
  $('main').on('click', '.js-reset-button', () => {
    store.reset();
    render();
  });
};

let bindEventListeners = function () {
  handleBillSubmit();
  handleBillCancelClick();
  handleResetClick();
};

export default {
  bindEventListeners,
  render
};