import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteConnect";
import AddNote from "./AddNote";
import Noteitem from "./Noteitem";
import { useNavigate } from "react-router-dom";
const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes,editNote } = context;
  const navi =useNavigate();

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      navi("/login")
    }
    //eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
    props.showAlert("Updated successfully","success")
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  

  const handleClick = (e) => {
    editNote(note.id,note.etitle,note.edescription,note.etag);
    refClose.current.click();
  };
  

  
  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        t
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
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="etitle"
                  placeholder="Kanishk Upadhyay"
                  value={note.etitle}
                  onChange={onChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="edescription" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="edescription"
                  name="edescription"
                  value={note.edescription}
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="etag" className="form-label">
                  TAG
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="etag"
                  name="etag"
                  value={note.etag}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button"className="btn btn-secondary"data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button"className="btn btn-primary" >Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-4">
        <h1>Your notes</h1>
        {notes.length===0 && "No Notes to Display"}
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
