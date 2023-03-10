import React, { useContext } from 'react';
import noteContext from "../context/notes/noteConnect";


const Noteitem = (props) => {
  const context = useContext(noteContext);
  const {deleteNote} = context;
  const {note,updateNote}=props;
  return (
    <div className='col-md-3'>
        <div className='card' key={note._id}>
            <div className='card-body'>
                <h5 className='card-title'>{note.title}</h5>
                <p className='card-text'>{note.description}</p>
                <i className="fa fa-trash fa-2x mx-2" onClick={()=>{deleteNote(note._id)}}></i>
                <i className="fas fa-edit fa-2x mx-2" onClick={()=>{updateNote(note)}}></i>
            </div>
        </div>
    </div>
  )
}

export default Noteitem