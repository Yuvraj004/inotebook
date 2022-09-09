import React, { useState } from "react";
import noteContext from "./noteConnect";

const NoteState =(props)=>{
    const host = "http://localhost:5000";
    const notesInitial=[]
    const [notes,setNotes]=useState(notesInitial);
    //get all notes function
    const getNotes =async ()=>{
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxNDgyY2EwYTg0Zjk5M2MyMTFkNzcyIn0sImlhdCI6MTY2MjI4ODY4M30.SH3yT9hD821XSFSAHPqbSRA28mT-OIvcwV2ustA0Rvs"
            },
         });
         const json=await response.json();
        console.log(json)
        setNotes(json)
    }
    //ADD note
    const addNote=async (title,description,tag)=>{
        //eslint-disable-next-line
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxNDgyY2EwYTg0Zjk5M2MyMTFkNzcyIn0sImlhdCI6MTY2MjI4ODY4M30.SH3yT9hD821XSFSAHPqbSRA28mT-OIvcwV2ustA0Rvs"
            },
            body: JSON.stringify({title,description,tag}) });
        let note={
            "_id": "63182f0db2ec2d70f6bacd1f",
            "user": "631482ca0a84f993c211d772",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2022-09-07T05:41:33.055Z",
            "__v": 0
        };
        console.log(await response.json)
        setNotes(notes.concat(note))
    }
    //del note
    const deleteNote=async(id)=>{
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxNDgyY2EwYTg0Zjk5M2MyMTFkNzcyIn0sImlhdCI6MTY2MjI4ODY4M30.SH3yT9hD821XSFSAHPqbSRA28mT-OIvcwV2ustA0Rvs"
            },
            });
        const newNotes = notes.filter((note)=>{return note._id !==id})
        setNotes(newNotes)
    }
    //edit note
    const editNote =async (id,title,description,tag)=>{
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxNDgyY2EwYTg0Zjk5M2MyMTFkNzcyIn0sImlhdCI6MTY2MjI4ODY4M30.SH3yT9hD821XSFSAHPqbSRA28mT-OIvcwV2ustA0Rvs"
            },
            body: JSON.stringify({title,description,tag}) });
            console.log(response.json);

        for (let index = 0; index < notes.length; index++) {
            const e = notes[index];
            if(e._id ===id){
                e.title=title;
                e.description=description;
                e.tag=tag;
            }
        }
    }
    return(
        <noteContext.Provider value={{notes,setNotes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;