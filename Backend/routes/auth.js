const express = require('express');
const User = require('../models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');



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
        // creating new user or instance of user or making a document inside collection
        user= await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      })

      res.json(user);
    }

    catch(error) {
        console.error(error.message);
        res.status(500).send("some error occured");
    }

    })
    
      
  

module.exports = router;  // Export the router
