import React from 'react';

class NoteInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            body: '',
        }

        this.onJudulEventHandler = this.onJudulEventHandler.bind(this);
        this.onCatatanEventHandler = this.onCatatanEventHandler.bind(this);
        this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
    }

    onJudulEventHandler(event) {
        const { value } = event.target;
    
        this.setState((prevState) => {
          return {
            ...prevState,
            title: value.length > 50 ? value.slice(0, 50) : value,
          };
        });
      }

    onCatatanEventHandler(event) {
        this.setState(() => {
            return {
                body: event.target.value,
            }
        });
    }

    onSubmitEventHandler(event) {
        event.preventDefault();
        this.props.addNote(this.state);
        this.setState(() => {
            return {
                title: '',
                body: '',
            };
          });
    }

    render() {

        return (
            <div className='note-app__body'>
                <form className='note-input' onSubmit={this.onSubmitEventHandler}>
                    <h1>Buat Catatan</h1>
                    <h3 className='note-input__title__char-limit'>Sisa Karakter: {this.state.title.length}/50</h3>
                    <input className="note-item__title" type="text" placeholder='Masukan judul ...' value={this.state.title} onChange={this.onJudulEventHandler} required/>
                    <textarea className='note-input__body' placeholder='Tulis catatan disini ...' value={this.state.body} onChange={this.onCatatanEventHandler} required/>
                    <button type="submit" rows="15" cols="70">Buat</button>
                </form>
            </div>
        )
    }
}

export default NoteInput;
