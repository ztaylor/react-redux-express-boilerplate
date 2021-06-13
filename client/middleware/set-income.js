const R = require('ramda');
const RD = require('../utils/ramda-decimal');

module.exports = (req, res, next) => {
  if (!R.has('income', req.body)) {
    return next(new Error('No income provided in request body'));
  }

  try {
    const income = RD.decimal(req.body.income);
    if (income.isNaN()) {
      return next(new Error('Income provided is NaN'));
    }

    req.runDate = req.body.runDate;
    req.income = income;
    return next();
  } catch (e) {
    return next(new Error('Income provided is an invalid number'));
  }
};
