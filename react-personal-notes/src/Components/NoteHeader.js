import React from "react";
import {showFormattedDate} from '../utils/data';

function NoteHeader({title, createdAt}) {
    return (
        <div>
            <h3 className="note-item__title">{title}</h3>
            <h3 className="note-item__date">{showFormattedDate(createdAt)}</h3>
        </div>
    )
}

export default NoteHeader;