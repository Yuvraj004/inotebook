import React, { useContext ,useEffect} from "react";
import noteContext from "../context/notes/noteConnect";
import AddNote from "./AddNote";
import Noteitem from "./Noteitem";

const Notes = () => {
  const context = useContext(noteContext);
  // eslint-disable-next-line
  const { notes,getNotes } = context;
  useEffect(() => {
    getNotes()
  
  }, [])
  

  return (
    <>
      <AddNote/>
      <div className="row my-4">
        <h1>Your notes</h1>
        {notes.map((note) => {
          return <Noteitem key={note._id} note={note} />;
        })}
      </div>
    </>
  );
};

export default Notes;
