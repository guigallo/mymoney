const Account = require('../models/Account');
const wrongRequest = require('../validate/account');
//const Category = require('../models/Category');
//const Transaction = require('../models/Transaction');



module.exports = {
  createAccount(req, res) {
    console.log(req.body);
    console.log(wrongRequest(req));
    if(wrongRequest(req)) {
      res.status(400).send({teste: 'asd'});
    }
    console.log(000);

    Account.create({
      name: req.body.name,
      value: req.body.value
    }, (error, account) => {
      console.log(error);
      if(error) return res.status(500).json({ error });

      console.log(account)
      res.status(201).json({ account });
    });
  }
}