const express = require('express');
const User = require('../models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt=  require('jsonwebtoken');
const fetchuser= require('../middleware/fetchuser')

const JWT_SECRET= "umangisaboy";



// Define route handlers inside the router
// ROUTE 1: create a user using : POST "/api/auth/createuser". No login required
      
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
    

    // ROUTE 2:  Authenticate a user using : POST "/api/auth/login". No login required
      
    router.post('/login',  //  1st endpoint

        [
           body('email','enter a valid email').isEmail(),
           body('password','Enter Password').exists(),
       ],  // 2nd  middlewares 

       async (req, res) => { // 3rd route handling function, if errors are present ,return bad request and error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
         return res.status(400).json({errors: errors.array()});
        }

        const {email,password} = req.body;



        
       try{
             // check if email used for login exists
            let user= await User.findOne({email});
            if(!user) {
                return res.status(400).json({error: "Enter a valid credential"});
            }

            const passwordcompare = await bcrypt.compare(password,user.password);
            if(!passwordcompare)
            {
                return res.status(400).json({error: "Enter a valid credential"});
            }    
              
          const data= {
            user: {
                id: user.id
            }
          }
          const authToken= jwt.sign(data,JWT_SECRET);
           res.json({authToken});
        }
    
        catch(error) {
            console.error(error.message);
            res.status(500).send("Interal server errpr");
        }
    
        })


        // ROUTE 3:  Get logged in User Details using : POST "/api/auth/getuser". Login Required

        
     router.post('/getuser',  //  1st endpoint
          fetchuser, // 2nd middleware
       async (req, res) => { // 3rd route handling function, if errors are present ,return bad request and error
         try{
            const userId =req.user.id;
            const user= await User.findById(userId).select("-password")
            res.send(user);
         }
    
        catch(error) {
            console.error(error.message);
            res.status(500).send("Interal server errpr");
        }
    
        })


module.exports = router;  // Export the router
