var express = require('express');
var router = express.Router();
const Mongoose = require('Mongoose');
const token = require('../../.secret.js')[1]
const fetch = require('node-fetch');

const debtorSchema = Mongoose.Schema({
  debtorName: String,
  typeId: String
}); 

const fractionSchema = Mongoose.Schema({
  name: String,
  type: String,
  amount: String
});

const debtorModel = Mongoose.model('debtors', debtorSchema);
const fractionModel = Mongoose.model('fraction', fractionSchema);


/* GET users listing. */
router.get('/debtors', function(req, res, next) {
  debtorModel.find({})
  .then(data => {
    res.json(data);
    res.send();
  })
});

router.post('/debtors', function(req, res, next) {
  debtorModel.create(req.body)
    .then(() => res.send(''))
});

router.delete('/debtors', function(req, res) {
  // console.log(req.body)
  debtorModel.remove(req.body)
    .then(() => res.send('kek'));
});

router.get('/fractions', function(req, res) {
  fractionModel.find({})
    .then(data => res.json(data))
    .then(() => res.send('kek'))

});

router.post('/fractions', function(req, res) {
  fractionModel.create(req.body)
    .then(() => res.send('kek'));
});

router.delete('/fractions/:id',function(req,res){
  console.log('deleting item', req.params.id);
  fractionModel.remove({_id:req.params.id}, (err,data)=>{
    if(err) throw err;
    debtorModel.remove({typeId: req.params.id})
      .then(() => res.send('kek'));
  })
})

router.get('/transactions', function(req, res){
  let transactions = [];
  let receivedTransactions = [];
  let i = 1;
  const promises = [];
  while(i < 2) {
    promises.push(fetch(`https://api.hackathon.developer.nordeaopenbanking.com/v2/accounts/FI6593857450293470-EUR/transactions?continuationKey=0220161114602505-${i}`, {
      headers: {
        Authorization: token,
        'x-ibm-client-id': '3c25e72a-0d80-4e9a-9b2c-fe3e9a726e32',
        'X-IBM-Client-Secret': require('../../.secret.js')[0],
        Accept: 'application/json'
      }
      }).then(data => data.json())
    );
    i++;
  }
  Promise.all(promises)
    .then(data => {
      receivedTransactions = data;
      return debtorModel.find({});
    })
    .then(debtors => {
      receivedTransactions.forEach(item => transactions = [...transactions, ...item.response.transactions]);
      transactions = transactions
        .filter(item => item.amount.includes('-'))
        .map(transaction => {
          const debtor = debtors.filter(item => item.debtorName == transaction.creditorName);

          return {
            ...transaction,
            fractionId: debtor[0] ? debtor[0].typeId : 'Unfiltered'
          }
        });
      res.json(transactions);
      res.send();
    })
});


module.exports = router;
