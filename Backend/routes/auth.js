const express = require('express');
const User = require('../models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt=  require('jsonwebtoken');

const JWT_SECRET= "umangisaboy";



// Define route handlers inside the router
//create a user using : POST "/api/auth/createuser"
router.post('/createuser',  //  1st endpoint

     [
        body('name','enter a valid name').isLength({min:3}),// query expects key and message argument, the msg that will be printed if error
        body('email','enter a valid email').isEmail(),
        body('password','password is invalid').isLength({min:5}),
    ],  // 2nd  middlewares 

       async (req, res) => { // 3rd route handling function, if errors are present ,return bad request and error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
         return res.status(400).json({errors: errors.array()});
        }
      
       /* User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      })
       .then(user=> res.json(user));
       */
      
       try{
    // check whether user with this email exist already
        let user= await User.findOne({email: req.body.email});
        if(user) {
            return res.status(400).json({error: "sorry a user with this mail exists"})
        }
        const salt= await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password,salt);
        // creating new user or instance of user or making a document inside collection
        user= await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
          
      const data= {
        user: {
            id: user.id
        }
      }
      const authToken= jwt.sign(data,JWT_SECRET);
      console.log(authToken);

      res.json({authToken});
    }

    catch(error) {
        console.error(error.message);
        res.status(500).send("some error occured");
    }

    })
    
      
  

module.exports = router;  // Export the router
