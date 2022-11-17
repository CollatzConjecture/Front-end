import React from 'react';
import { getInitialData } from '../utils/data';
import NavBar from './NavBar';
import NoteInput from './NoteInput';
import NoteList from './NoteList';

class NotesApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          notes: getInitialData(),
          searchText: getInitialData(),
          searchTitle: "",
        };

        this.addNoteHandler = this.addNoteHandler.bind(this);
        this.deleteNoteHandler = this.deleteNoteHandler.bind(this);
        this.archiveNoteHandler = this.archiveNoteHandler.bind(this);
        this.searchNoteHandler = this.searchNoteHandler.bind(this);
    }

    addNoteHandler({ title, body }) {
      this.setState((prevState) => {
        return {
          notes: [
            ...prevState.notes,
            {
              id: +new Date(), 
              title,
              body,
              archived: false,
              createdAt: new Date().toISOString()
            }
          ]
        }
      });
      }

    deleteNoteHandler(id) {
        const notes = this.state.notes.filter(note => note.id !== id);
        this.setState({ notes });
    }

    archiveNoteHandler(id) {
        const notes = this.state.notes;
        notes.forEach((note) => {
          if (note.id === id) {
            note.archived = !note.archived
          };
        });
        this.setState((prevState) => ({ ...prevState, notes }));
    }

    searchNoteHandler(keySearch) {
      this.setState((prevState) => {
        return {
         ...prevState,
         searchTitle: keySearch.target.value
        }
      })
    }

    noteList() {
        const { searchTitle, notes } = this.state;
          let noteList;
          if(searchTitle.trim().length) {
            noteList = notes.filter((note) =>
              note.title.toUpperCase().includes(searchTitle.toUpperCase()))
          }  else {
            noteList = notes;
          }
        return noteList.sort((x, y) => x.date - y.date).reverse();
      }

    render() {
        return (
            <div className='note-app'>
                <NavBar onType={this.searchNoteHandler}/>
                <NoteInput addNote={this.addNoteHandler}/>
                <h2>Catatan Aktif</h2>
                <NoteList 
                    notes= {this.noteList().filter((note) => !note.archived)}
                    deleteNote={this.deleteNoteHandler} 
                    arsipNote={this.archiveNoteHandler} 
                    />
                <h2>Arsip</h2>
                <NoteList 
                    notes= {this.noteList().filter((note) => note.archived)}
                    deleteNote= {this.deleteNoteHandler} 
                    arsipNote= {this.archiveNoteHandler} />
            </div>
        );
    }
}

export default NotesApp;