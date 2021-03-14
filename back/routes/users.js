const router = require('express').Router();
const express = require('express')
const app = express()
const User = require('../models/User');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation} = require('../validation');
//Registre

router.post('/register',async (req,res) => {

    /*const { error } = registerValidation(req.body);
     if(error) return res.status(400).send(error.details[0].message)*/

    const emailexist = await User.findOne({email: req.body.email});
    if(emailexist) return res.status(400).send('email already exists');
    
   /* const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt);*/

    const user = new User( { 
        role_id : req.body.role_id,
        name : req.body.name,
        email : req.body.email,
        phone_number : req.body.phone_number,
        password : req.body.password //hashPassword
     });
     try {
         const saveUser = await user.save();
         res.send(saveUser);
     }
     catch(err) {
         res.status(400).send(err);
     }
})

//Login

router.post('/login', async (req,res) => {
    
    const { error } = loginValidation(req.body); 
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email,password : req.body.password});
    if(!user) return res.status(401).send('email or password is wrong');

    const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET,{expiresIn : "1h"});

    res.header('auth-token',token).json({token,user} );
     
      return res.status(200).send(token)

 
})

router.put("/edit_admin/:id",async (req,res)=> {
    const findUser = await User.findById({_id : req.params.id})
    if(!findUser) return res.status(401).send('user not found');
    console.log(findUser)
  
    await findUser.update(
        {
            //user : req.body.user,
            $push: {
                users: {
                    id: req.body.user_id
                }
            }
        });
    return res.send(findUser)
    
})

router.put("/edit_worker/:id",async (req,res)=> {
    const findUser = await User.findById({_id : req.params.id})
    if(!findUser) return res.status(401).send('user not found');
    console.log(findUser)
  
    await findUser.update(
        {
            //user : req.body.user,
            $push: {
                worksAt: {
                    id: req.body.user_id
                }
            }
        });
    return res.send(findUser)
    
})

router.get("/:id",async (req,res)=> {
    const findUser = await User.findById({_id : req.params.id})
    if(!findUser) return res.status(401).send('user not found');
    console.log(findUser)
    return res.send(findUser)
    
})

module.exports = router