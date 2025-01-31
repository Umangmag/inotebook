const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const router = express.Router();
const { body, validationResult } = require('express-validator');

 // ROUTE 1:  Get logged in User's Notes Details using : Get "/api/auth/fetchallnotes". Login Required
    
router.get('/fetchallnotes', fetchuser, async (req, res) => {

  try{
     const notes = await Note.find({user: req.user.id}).populate('user','name email');
     res.json(notes);
    }

     catch(error) {
      console.error(error.message);
      res.status(500).send("Interal server errpr");
  }
  
       
});

// ROUTE 2: Add a new note using : Post "/api/auth/addnote". Login Required
router.post('/addnote', fetchuser,
  [
    body('title','enter a valid title').isLength({min:3}),// query expects key and message argument, the msg that will be printed if error
    body('description','enter a valid description').isLength({min:5}),
],  
async (req, res) => {
  try {
    const {title,description,tag}= req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
   return res.status(400).json({errors: errors.array()});
  }

  const note  = new Note({
    title,description,tag,user: req.user.id
  });
  const savedNote = await note.save()
  res.json(savedNote);
  
  } 
    catch(error) {
      console.error(error.message);
      res.status(500).send("Interal server errpr");
  }
  
  
});

// ROUTE 3: Update an Existing Note using : PUT "/api/auth/updatenote". Login Required

router.put('/updatenote/:id', fetchuser, //:id is dynamic placeholder anything after endpoint and before query wikk be placed to id
async (req, res) => {
  try {
   const {title,description,tag}= req.body;

  const newNote  = {};
  if(title){newNote.title= title};
  if(description){newNote.description= description};
  if(tag){newNote.tag= tag};

  // Find the note to be updated and update it

  let note = await Note.findById(req.params.id);
  if(!note) {return res.status(404).send("Not Found")};

  if(note.user.toString()!==req.user.id){
    return res.status(401).send("Not Allowed");
  }

  note = await Note.findByIdAndUpdate(req.params.id,{$set: newNote}, {new: true});
  res.json({note});

 
  
}
    catch(error) {
      console.error(error.message);
      res.status(500).send("Interal server errpr");
  }
  
  
});
module.exports = router;  // Export the router


// ROUTE 4: Delete an Existing Note using : Delete "/api/auth/deletenote". Login Required

router.delete('/deletenote/:id', fetchuser, //:id is dynamic placeholder anything after endpoint and before query wikk be placed to id
  async (req, res) => {
    try {

    // Find the note to be deleted and delete it
  
    let note = await Note.findById(req.params.id);
    if(!note) {return res.status(404).json({error :"Not Found"})};
  
    if(note.user.toString()!==req.user.id){
      return res.status(401).json({error: "Not Allowed"});
    }
  
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({"success": "Note is deleted"});
  
   
    
  }
      catch(error) {
        console.error(error.message);
        res.status(500).json({error: "Interal server error"});
    }
    
    
  });
  module.exports = router;  // Export the router