const router = require('express').Router();
const express = require('express')
const Company = require('../models/Company');

router.post('/add',async (req,res) => {

   /* const { error } = registerValidation(req.body);
     if(error) return res.status(400).send(error.details[0].message)*/

    

    const company = new Company( { 
        name_company : req.body.name_company,
        id_User : req.body.id_User, 
        category_company : req.body.category_company,
     });
     try {
         const savecompany = await company.save();
         res.send(savecompany);
     }
     catch(err) {
         res.status(400).send(err);
     }
})

router.get('/:id', async (req,res) => {
    const getAllCompanies = Company.findOne({id_User : req.params.id})
    if(!getAllCompanies) return res.status(401).send('companies not found');
    return res.send(getAllCompanies)
})

module.exports = router