import React from "react";
import NoteHeader from "./NoteHeader";
import NoteItemBody from "./NoteItemBody";
import DeleteButton from "./DeleteButton";
import ArsipButton from "./ArispButton";

function NoteItem({note, arsipNote, deleteNote}) {
    return (
        <div className="note-item">
            <div className="content-item">
                <NoteHeader title={note.title} createdAt={note.createdAt}/>
                <NoteItemBody body={note.body}/>
            </div>
            <div className="action-button">
                <ArsipButton arsipkan={note.arsipkan} onClick={() => arsipNote(note.id)}/>
                <DeleteButton onClick={() => deleteNote(note.id)}/>
            </div>
        </div>
    )
}

export default NoteItem;