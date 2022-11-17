import React from "react";
import NoteItem from "./NoteItem";

function NoteList({ notes, deleteNote, arsipNote }) {
  if(notes.length) {
    return (
      <div className="notes-list">
        {notes.map((note) => (
          <NoteItem 
            note={note}
            key={note.id}
            deleteNote={deleteNote}
            arsipNote={arsipNote}
            {...note}
          />
        ))}
      </div>
    );
  }
  
  return <p>Tidak ada catatan</p>;
}

export default NoteList;
