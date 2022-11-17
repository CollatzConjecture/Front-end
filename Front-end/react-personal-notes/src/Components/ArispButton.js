import React from "react";

function ArchiveButton({ arsipkan, onClick }) {
  return (
    <button className="note-item__archive-button" onClick={onClick}>
      {arsipkan ? "Pindahkan" : "Arsipkan"}
    </button>
  );
}

export default ArchiveButton;
