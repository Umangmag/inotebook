import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

const Notes = () => {
  const { notes, getNotes, editNote} = useContext(noteContext);

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);

  
  const ref = useRef(null);//just to reference a tag and call it without rerendering\
  const refclose= useRef(null);

   const [note,setNote]= useState({id: "",etitle: "", edescription: "", etag: ""})

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id,etitle: currentNote.title,edescription: currentNote.description,etag: currentNote.tag})
  };

   // Handle click and onchange copied from the file AddNote.js

  const handleclick = (e) => {
    console.log("updating the note")
    refclose.current.click();
    editNote(note.id,note.etitle,note.edescription,note.etag)
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };


  return (
    <>
      <AddNote />

      {/* ADDING MODAL BOOTSTRAP */}

      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">

              {/* FORM ADDED FOR MODEL SAME FORM USED IN ADD NOTE */}
              <form className="my-3">
                <div className="form-group">
                  <label htmlFor="etitle">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    placeholder="Enter Title"
                    minLength={5} required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="edesc">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="edesc"
                    name="edescription"
                    value= {note.edescription}
                    onChange={onChange}
                    placeholder="Enter Description"
                    minLength={5} required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="etag">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value= {note.etag}
                    onChange={onChange}
                    placeholder="Enter Description"
                  />
                </div>
              </form>
                  {/* FORM ENDED */}

            </div>
            <div className="modal-footer">
              <button ref={refclose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button disabled={note.etitle.length<5||note.edescription.length<5} onClick= {handleclick} type="button" className="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ADDING MODEL BOOTSTRAP ENDED */}

      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container mx-2">
        {(notes.length===0) && "No Notes to Display"}
        </div>
        {notes.map((note) => {
          return (
            <NoteItem key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
