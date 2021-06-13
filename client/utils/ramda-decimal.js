const {Decimal} = require('decimal.js');
const R = require('ramda');

const RD = {};

RD.ZERO = new Decimal(0);

RD.equals = R.curry(
  (x, y) => R.equals(x,y)
);

RD.decimal = R.curry(
  (x) => new Decimal(x),
);

RD.lt = R.curry(
  (x, y) => RD.decimal(x)
    .lt(y),
);

RD.gt = R.curry(
  (x, y) => RD.decimal(x)
    .gt(y),
);

RD.fixed = R.curry(
  (dp, rm, x) => RD.decimal(x)
    .toFixed(dp, rm),
);

RD.multiply = R.curry(
  (x, y) => RD.decimal(x)
    .times(y),
);

RD.divide = R.curry(
  (x, y) => RD.decimal(x)
    .dividedBy(y),
);

RD.add = R.curry(
  (x, y) => RD.decimal(x)
    .plus(y),
);

RD.sum = R.reduce(RD.add, RD.ZERO);

RD.subtract = R.curry(
  (x, y) => RD.decimal(x)
    .minus(y),
);

RD.max = R.curry(
  (x, y) => Decimal.max(x, y),
);

RD.min = R.curry(
  (x, y) => Decimal.min(x, y),
);

RD.isPositive = (x) => {
  if (R.isNil(x)) return false;
  const num = new Decimal(x);
  return num.isPositive(0);
};

const rounding = R.pick([
  'ROUND_UP',
  'ROUND_DOWN',
  'ROUND_CEIL',
  'ROUND_FLOOR',
  'ROUND_HALF_UP',
  'ROUND_HALF_DOWN',
  'ROUND_HALF_EVEN',
  'ROUND_HALF_CEIL',
  'ROUND_HALF_FLOOR',
  'EUCLID',
], Decimal);

module.exports = {
  ...RD,
  ...rounding,
};
