const nationalInsurance = require('../services/national-insurance');

module.exports = (req, res) => {
  
  const ni_ = nationalInsurance()(req.income);

  res.json({
    income: req.income,
    ni: ni_
  });



};
