import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import env from '../env.json'



function Note() {


    let { noteURL } = useParams();
    const [noteText, setNoteText] = useState('');
    const [formClass, setFormClass] = useState('');
    const [lineClass, setLineClass] = useState('');
    const [errorClass, setErrorClass] = useState('hide');

    useEffect(() => {
        async function fetchData() {
            if (noteURL !== undefined) {
                setFormClass('hide');
                const respons = await fetch(env.urlBackend, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify({ "url": noteURL }),
                })
                const data = await respons.json()


                if (data) {
                    setNoteText(data.result
                    );
                    setLineClass('');
                    setFormClass('hide');
                }
                else if (!data) {
                    setLineClass('hide');
                    setFormClass('hide');
                    setErrorClass('');
                }
            }
            else {
                setFormClass('');
                setLineClass('hide');
            }
        }
        fetchData()
    }, [noteURL]);

    function getNote(event) {
        event.preventDefault();
        let url = event.target.elements.url.value;
        url = url.trim();
        if (url === '') {
            alert('Поле вводу пусте');
            return false;
        }
        noteURL = url;
        window.location.href = env.url + url;
    }

    function searchNote() {
        window.location.href = env.url;
    }


    return (

        <div className="row">
            <div className="col-12">
                <div className="text">

                    <form action="" onSubmit={getNote} className={formClass}>
                        <div className="form-group">
                            <label htmlFor="url">Введіть код замітки</label>
                            <input type="text" name="url" id="url" className="form-control" placeholder="Введіть код" />
                        </div>
                        <div className="form-group text-right">
                            <button type="submit" className="btn btn-primary">Получити замітку</button>
                        </div>
                    </form>
                </div>
                <div className={lineClass}>
                    <div className="alert alert-success" role="alert">
                        <h4 className="alert-heading">Note: {noteURL}</h4>
                        <div>{noteText}</div>
                        <hr />
                        <p className="mb-0"> Скопіюйте замітку. Після показу замітка видалиться!</p>
                    </div>
                    <div className="text-right"><button onClick={searchNote} className="btn btn-primary">Шукати замітку</button></div>
                </div>
                <div className={errorClass}>
                    <div className="alert alert-danger" role="alert">
                        Замітка з таким кодом не знайдена!
                    </div>
                    <div className="text-right"><button onClick={searchNote} className="btn btn-primary">Шукати замітку</button></div>
                </div>
            </div>
        </div >
    );
}

export default Note;