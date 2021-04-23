const router = require('express').Router();
const express = require('express')
const Role = require('../models/Role');

router.post('/add',async (req,res) => {

   /* const { error } = registerValidation(req.body);
     if(error) return res.status(400).send(error.details[0].message)*/

    const roleExist = await Role.findOne({role: req.body.role});
    if(roleExist) return res.status(400).send('Role already exists');
    
  

    const role = new Role( { 
        role : req.body.role
        
     });
     try {
         const saveRole = await role.save();
         res.send(saveRole);
     }
     catch(err) {
         res.status(400).send(err);
     }
})

router.get('/user',async (req,res) => {

    /* const { error } = registerValidation(req.body);
      if(error) return res.status(400).send(error.details[0].message)*/
 
     const role = await Role.find({role : 'User_test'});
        res.send(role);
     
 })

module.exports = router