import React, { useState } from "react";
import noteContext from "./noteConnect";

const NoteState =(props)=>{
    const host = "http://localhost:5000";
    let notesInitial=[];
    let [notes,setNotes]=useState(notesInitial);
    
    //get all notes function
    const getNotes =async ()=>{
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "auth-token":localStorage.getItem('token')
            },
         });
        const json=await response.json();
        // console.log(json);
        setNotes(json);
        // console.log(notes);
    }

    //ADD note
    const addNote=async (title,description,tag)=>{
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "auth-token":localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag}) });
        const note = response.json;
        setNotes(notes.concat(note))
        // console.log(notes)
    }

    //del note
    const deleteNote=async(id)=>{
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              "auth-token":localStorage.getItem('token')
            },
            });
        const newNotes = notes.filter((note)=>{return note._id !==id})
        const json = response.json;
        // console.log( json);
        setNotes(newNotes)
    }
    //edit note
    const editNote =async (id,title,description,tag)=>{
        await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              "auth-token":localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag}) 
        });
        // console.log(await response.json);
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            const e = newNotes[index];
            if(e._id ===id){
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag; 
                break;
            }
        }
        setNotes(newNotes);
    }
    return(
        <noteContext.Provider value={{notes,setNotes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;