import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  let notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

     
  //GET ALL NOTES

  const getNotes = async () => {

    // API CALL

    const response = await fetch (`${host}/api/notes/fetchallnotes` , {
      method: "GET",
      headers: {
         "content-Type": 'application/json',
         "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc4YWU3OGFiMGYxYTc2MmYxYzc3NzhkIn0sImlhdCI6MTczNzIwNDUyN30.s-lS1TObWEtL1Ciyy-8VCQb40PVsOITSmtKRB3obdlg"
      },
  
    });
    
      const json = await response.json();
        setNotes(json);    
   
  };



  //Add a Note
  const addNote = async (title, description, tag) => {

    // API CALL

    const response = await fetch (`${host}/api/notes/addnote` , {
      method: "POST",
      headers: {
         "content-Type": 'application/json',
         "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc4YWU3OGFiMGYxYTc2MmYxYzc3NzhkIn0sImlhdCI6MTczNzIwNDUyN30.s-lS1TObWEtL1Ciyy-8VCQb40PVsOITSmtKRB3obdlg"
      },
      body: JSON.stringify({title,description,tag}),
    });

    const note =await response.json();
    setNotes(notes.concat(note));


  };

  //Delete a Note
  const deleteNote = async (id) => {
    // TODO API CALL

    const response = await fetch (`${host}/api/notes/deletenote/${id}` , {
      method: "DELETE",
      headers: {
         "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc4YWU3OGFiMGYxYTc2MmYxYzc3NzhkIn0sImlhdCI6MTczNzIwNDUyN30.s-lS1TObWEtL1Ciyy-8VCQb40PVsOITSmtKRB3obdlg"
      }
    });
    
    const json = await response.json();
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API CALL

    const response = await fetch (`${host}/api/notes/updatenote/${id}` , {
      method: "PUT",
      headers: {
         "content-Type": 'application/json',
         "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc4YWU3OGFiMGYxYTc2MmYxYzc3NzhkIn0sImlhdCI6MTczNzIwNDUyN30.s-lS1TObWEtL1Ciyy-8VCQb40PVsOITSmtKRB3obdlg"
      },
      body: JSON.stringify({title,description,tag}),
    });
    
    const json = await response.json();

    
    //LOGIC TO EDIT IN CLIENT
   let newNotes= JSON.parse(JSON.stringify(notes))// this is deep copying so state variable wont be affected

   for(let index=0;index<newNotes.length;index++){
    const element= newNotes[index];
    if(element._id===id){
      newNotes[index].title=title;
      newNotes[index].description=description;
      newNotes[index].tag=tag;
      break;
    }
   }

   setNotes(newNotes); 

   // one more way is there to update without affecting the state variable 
       
  //  const updatedNotes = notes.map((note) => {
  //   if (note._id === id) {
  //     return { ...note, title, description, tag }; // Create a new updated note object
  //   }
  //   return note; // Return unchanged notes
  // }); 

  // setNotes(updatedNotes);


  };

  return (
    <noteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote ,getNotes }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
