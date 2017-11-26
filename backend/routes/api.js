var express = require('express');
var router = express.Router();
const Mongoose = require('Mongoose');
const token = "Bearer eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTI4R0NNIiwiYWxnIjoiZGlyIn0..sHrzcnihXjO4Vs5F.GVgAfJCCashlluYSq0TFzn-hZYkVzcxB7MGB3L2owSRy0KuGO3JxJmCMnqRewWHxEvLGxRqwEfiULRw43q4v7Vv46oMqRm-kKb8xcu2S2IdBLxBQGW3B_ieSLZZ46MARkoYN78tTdb1XqV2UWCTaMUkPPwvUQj0_LYuGjtZx7Vywoh2vWiIrG_LaYF2ogbC0DYIbkKO29w3kv5YkQH12Gb5rCLGWBCysga_C-uqKvRQ0TAUpCno8VhXB-uZiqReU8JXKgPEKG2Sr1j8V0u2pPl4JnDXE51DE5C61TZFePCZtjGYwfcFPB9_5ze_L1-kR5DsUpbg8M5WA9uF9tERp8NaFQtGT5yxrozFdimZbGnNjedfwHMGqsEiyjAaLVNgKYVv8sE-OXGtdRqzAQctEToARar4AYg0y0vfkv18rPA5PRSTRYBvLqFhMeOD2TqJgGGPBWYTtBUBya6jJ55gH4SqE9rKGr5m00XKfVhIrFFmxxvt7N-JJEPRz9RdYoGDoZfIbv1HhztTroIBWVXtF35BHnMdSFkZtFrvUMynL1I8R_cJDT9RuZgFJYobZqt4RyXWkNx80tKucqQ8d7EQupi-f-RejfehaG8ND3aFyuk1U8mTPNs46boJ_QohMBjj6NExA2Pg7PbpwxYJ1dqmkXQUraaVDjjUOJTpUtrAxxj7KBu852sPkuy-_CDKSiQhRQjZ_KBGUtMmEyApaBiN19hItx0S0AEOMq2iQd_GPqhSfvE5qLq2u7zSptCJwOJjH0JFX9qGgdRWC7PzHBYBXzcdQkagSop-b9N81Uxba6w-K2GXksAhH8Pl1NTeAJCFypgHabetwbh5VEUjdDX2vSoB6yf2Skj9jT3TJOfHQZ2T9EsQZ21v824CRnq0yzS7Xg97GaV0YgXyy7boPL-sMFq3m_bvGBu4LgkRZ96-G5ejbrCG3MO62ID824yexiVo0Q0CaNYZUN6RN8kYePTp-L3cf4UTVrmybXHIZhXaeMocfzYXUxPSQRWM7OzU3SvrCez3d2u4jQXYXV_yYnt_SO6bEeww3FahmwEa8QARmnAAgV60_4I4Q05JKDvsI-yGK_Ry4xYcSG7wDLbL-cYglsmh1l8x53keOvqlzuL0bJwhhqycIeu_ewTi7JLfKGXJefpgTmQqo8AwmmE6W1xDbvaVtXcx1i3l1Dl9LwN7SMaA.C-ZQnA2TxTgZJ1xaQfjH4A";
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
        'X-IBM-Client-Secret': require('../../.secret.js'),
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
