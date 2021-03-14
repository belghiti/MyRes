const router = require('express').Router();
const Order_Entries = require('../models/Order_entries');

router.post('/add',async (req,res) => {


    const order_entries = new Order_Entries( { 
        product_id : req.body.product_id,
        order_id: req.body.order_id,
        quantity : req.body.total
        
     });
     try {
         const saveOrderEntries = await order_entries.save();
         res.send(saveOrderEntries);
     }
     catch(err) {
         res.status(400).send(err);
     }
})

router.get('/',async (req,res) => {

    const allOrderEntries= await Order_Entries.find() 

    res.send(allOrderEntries)
 })


module.exports = router