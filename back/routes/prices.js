const router = require('express').Router();
const Price = require('../models/Price');

router.post('/add',async (req,res) => {

    const price = new Price( { 
        value : req.body.value,
        currency : req.body.currency
        
     });
     try {
         const savePrice = await price.save();
         res.send(savePrice);
     }
     catch(err) {
         res.status(400).send(err);
     }
})


module.exports = router