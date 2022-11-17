import React from 'react';

function NavBar({onType}) {
    return (
        <div className='note-app__header'>
            <h1>Notes</h1>
            <input type="text" placeholder="Cari Catatan..." onChange={(e) => onType(e)} />
        </div>
    );
}

export default NavBar;