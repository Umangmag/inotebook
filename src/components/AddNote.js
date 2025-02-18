import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

function AddNote() {
    const {addNote} = useContext(noteContext);
    const [note,setNote]= useState({title: "", description: "", tag: ""})

    const handleclick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({ title: "", description: "", tag: "" });

    };

    const onChange=(e)=>{
          
           setNote({...note,[e.target.name]: e.target.value})
    }

  return (
    <div className="container my-3">
      <h2>Add a Note</h2>
      <form className="my-3">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            aria-describedby="emailHelp"
            onChange={onChange}
            placeholder="Enter Title"
            minLength={5} required
          />
         
        </div>
        <div className="form-group">
          <label htmlFor="desc">Description</label>
          <input
            type="text"
            className="form-control"
            id="desc"
            name="description"
            value={note.description}
            onChange={onChange}
            placeholder="Enter Description"
            minLength={5} required
          />
        </div>
       
        <div className="form-group">
          <label htmlFor="tag">Tag</label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={onChange}
            placeholder="Enter Tag"
          />
        </div>

        <button disabled={note.title.length<5||note.description.length<5} type="submit" className="btn btn-primary" onClick={handleclick}>
          Add Note
        </button>
      </form>
    </div>
  );
}

export default AddNote;
