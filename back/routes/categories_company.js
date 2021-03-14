const router = require('express').Router();
const express = require('express')
const CategoriesCom = require('../models/Categories_company');

router.post('/add',async (req,res) => {

   /* const { error } = registerValidation(req.body);
     if(error) return res.status(400).send(error.details[0].message)*/

    const CategoriesComExist = await CategoriesCom.findOne({name: req.body.name});
    if(CategoriesComExist) return res.status(400).send('This name already exists');
    
  

    const catcom = new CategoriesCom( {  
        name : req.body.name
        
     });
     try {
         const saveCatCom = await catcom.save();
         res.send(saveCatCom);
     }
     catch(err) {
         res.status(400).send(err);
     }
})

router.get('/', async (req,res) => {
    const allCatCompany = await CategoriesCom.find();
    if(!allCatCompany) return res.status(400).send('Never category Company exist');
    res.send(allCatCompany)
})

module.exports = router