const R = require('ramda');
const moment = require('moment');
const RD = require('../utils/ramda-decimal');
const date_ = require('../middleware/date');
const allBands = require('../config/ni');

const isDateOnOrAfter = R.curry(
  (date, dateString) => moment.utc(dateString, 'YYYY-MM-DD')
    .isSameOrBefore(date),
);

const noBandsError = (date) => new Error(`National Insurance bands unavailable for date ${date}`);

const bandsOnDate = (date) => {
  console.log('start date ' + date);
  const month = moment.utc(date, 'YYYY-MM-DD');
  
  return R.compose(
    R.when(R.isNil, () => {
      throw noBandsError(date);
    }),
    R.prop('bands'),
    R.last,
    R.filter(R.propSatisfies(isDateOnOrAfter(month), 'startDate')),
  )(allBands);
};

// TODO this should do more than return the number it's given
const slice = R.curry((floor, ceiling, num) => {
  console.log('slice '+floor + ' ' +  ceiling + ' ' + num);

  floor = RD.decimal(floor);
  ceiling = RD.decimal(ceiling);

  const zero = RD.decimal(0);

  if (RD.lt(num, floor))
    return zero;
  else if (RD.equals(num, floor)) 
    return zero;
  else if (RD.equals(num, ceiling) && !RD.equals(floor, zero)) 
    return RD.decimal(ceiling - floor);
  else if (RD.gt(num, floor) && RD.lt(num, ceiling))
    return RD.decimal(num - floor);
  else if (num > ceiling)
    return RD.decimal(ceiling - floor);
  else
    return RD.decimal(num);
});

/*
const calcForBand = (income,bands ) => R.curry(
  (income, { floor, ceiling, rate }) => RD.multiply(
    slice(floor, ceiling, income, rate),
    rate,
  ),
)*/

const calcForBand = R.curry(
  (income, { floor, ceiling, rate }) => RD.multiply(
    slice(floor, ceiling, income),
    rate,
  ),
);

// Calculate N1
module.exports = (income) => {

 const runDate = R.compose(
    R.prop('runDate')
  )(date_);

  const date = moment(runDate).utc(); // create a moment from string
  const bands = bandsOnDate(income || date); // Get the date

  return R.compose(
    RD.sum,
    R.flip(R.map)(bands),
    calcForBand,
  );
};

// for unit tests
module.exports.bandsOnDate = bandsOnDate;
module.exports.slice = slice;
