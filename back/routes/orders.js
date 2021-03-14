const router = require('express').Router();
const Order = require('../models/Order');
//import moment from 'moment';
const moment = require('moment');
router.post('/add',async (req,res) => {


    const order = new Order( { 
        user_id : req.body.user_id,
        date: req.body.date,
        total : req.body.total,
        products: req.body.products
     });
     try {
         const saveOrder = await order.save();
         console.log(saveOrder)
         res.send(saveOrder);
     }
     catch(err) {
         res.status(400).send(err);
     }
})

router.get('/:id',async (req,res) => {
  const week = moment().subtract(0, 'days').format('DD-MM-YYYY')
  console.log('Week : ',week)
    const allOrders= await Order.find({user_id: req.params.id}) 
    .populate({ path: 'user_id', select: 'name' })

    res.send(allOrders)
 })

 router.get('/daily-stats/:id',async (req,res) => {
 // const dateWithoutEspace = req.params.date.replace()
 var dt = 0
//const week = moment().subtract(7, 'days').format('DD-MM-YYYY')
const ordr = await Order.find({user_id: req.params.id}) 
if(ordr) {
  const date_0 = moment().subtract(dt, 'days').format('DD-MM-YYYY')
const date_1 = moment().subtract(dt+1, 'days').format('DD-MM-YYYY')
const date_2 = moment().subtract(dt+2, 'days').format('DD-MM-YYYY')
const date_3 = moment().subtract(dt+3, 'days').format('DD-MM-YYYY')
const date_4 = moment().subtract(dt+4, 'days').format('DD-MM-YYYY')
const date_5 = moment().subtract(dt+5, 'days').format('DD-MM-YYYY')
const date_6 = moment().subtract(dt+6, 'days').format('DD-MM-YYYY')

  const order_day0 = await Order.find({date:date_0})
  const order_day1 = await Order.find({date:date_1})
  const order_day2 = await Order.find({date:date_2})
  const order_day3 = await Order.find({date:date_3})
  const order_day4 = await Order.find({date:date_4})
  const order_day5 = await Order.find({date:date_5})
  const order_day6 = await Order.find({date:date_6})
  //const order_day = await Order.find({date:req.params.date})

  //if(!order_day) return res.status(400).send("This order not exist")
  console.log(order_day0)
  res.send([order_day0,order_day1,order_day2,order_day3,order_day4,order_day5,order_day6])
}

})

/* router.put('/update/:id',async (req,res) => {

    return Product.findById(req.params.id, function (err, product) {
        product.name = req.body.name;
        product.price = req.body.price;
        product.status = req.body.status;
        product.category_Product_id = req.body.category_Product_id;
        return product.save(function (err) {
          if (!err) {
            console.log("updated");
          } else {
            console.log(err);
          }
          return res.send(product);
        });
      });
 })

 router.delete('/delete/:id',async (req,res) => {

    return Product.findById(req.params.id, function (err, product) {
        return product.remove(function (err) {
          if (!err) {
            console.log("removed");
            return res.send('');
          } else {
            console.log(err);
          }
        });
      });
 })

 router.get('/:category',async (req,res) => {


    const categry_product = await Product.find({category_Product_id:req.params.category})
    .populate({path : "category_Product_id",select : 'name'}).exec()

    if(!categry_product) return res.status(400).send("Category not exist")
    console.log(categry_product)
    console.log(categry_product.CategoryProduct)
    res.send(categry_product)
})
*/
module.exports = router