import React, { useState,useContext } from "react";
import noteContext from "../context/notes/noteConnect";

const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const[note,setNote]=useState({title:"",description:"",tag:""})
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    <div>
      <div className="container my-4">
        <h1>Add a note</h1>
        <form className="my-3" action="">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              placeholder="Kanishk Upadhyay"
              onChange={onChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description" onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">TAG</label>
            <input type="text" className="form-control" id="tag" name="tag" onChange={onChange}/>
          </div>
          <div className="col-12">
            <button disabled={note.title.length<5 || note.description.length<5} className="btn btn-primary" type="submit" onClick={handleClick}>
              Add Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
