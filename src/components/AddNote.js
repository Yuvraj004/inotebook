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
              placeholder="name@example.com"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description" onChange={onChange}/>
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form=check-input" id="exampleCheck1"/>
            <label htmlFor="exampleCheck1" className="form-check-label">
              Example
            </label>
          </div>
          <div className="col-12">
            <button className="btn btn-primary" type="submit" onClick={handleClick}>
              Add Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
