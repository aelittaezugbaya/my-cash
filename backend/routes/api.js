var express = require('express');
var router = express.Router();
const Mongoose = require('Mongoose');

const debtorSchema = Mongoose.Schema({
  debtorName: String,
  typeId: String
}); 

const fractionSchema = Mongoose.Schema({
  name: String,
  type: String,
  amount: String
});

const debtorModel = Mongoose.model('debtor', debtorSchema);
const fractionModel = Mongoose.model('fraction', fractionSchema);


/* GET users listing. */
router.get('/', function(req, res, next) {
  
});

router.get('/fractions', function(req, res) {
  fractionModel.find({})
    .then(data => res.body(JSON.stringify(data)))
});

router.post('/fractions', function(req, res) {
  console.log(req.body)
  res.body='kek';
  res.send();
});

module.exports = router;
