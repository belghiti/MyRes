const router = require('express').Router();
const CategoriesProduct = require('../models/Categories_products');

router.post('/add',async (req,res) => {

   /* const { error } = registerValidation(req.body);
     if(error) return res.status(400).send(error.details[0].message)*/

    const CategoriesProductExist = await CategoriesProduct.findOne({name: req.body.name});
    if(CategoriesProductExist) return res.status(400).send('This name already exists');
    
  

    const catProduct = new CategoriesProduct( {  
        name : req.body.name
        
     });
     try {
         const saveCatProduct = await catProduct.save();
         res.send(saveCatProduct);
     }
     catch(err) {
         res.status(400).send(err);
     }
})

router.get('/', async (req,res) => {
    const catProduct = await CategoriesProduct.find();
    if(!catProduct) return res.status(400).send('Never category Company exist');
    return res.send(catProduct)
})

module.exports = router