import React from 'react';
import { useState,useEffect } from 'react';
import env from '../env.json'

function Create() {
    const [formClass, setFormClass] = useState();
    const [lineClass, setLineClass] = useState('hide');
    const [url, setUrl] = useState('');
    const [countInput, setCountInput] = useState(1000)
    const [buttunClass, setButtunClass] = useState('');
    const [pClass, setPClass] = useState('hide');
    const [ifEror, setIfEror] = useState();

    const sendData = async (obj) => {
        setFormClass('hide');
        setLineClass('');
        try {
            const respons = await fetch(env.urlBackend, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(obj),
            })
            const data = await respons.json()
            if (data) {
                setUrl(data.url);
            }
        } catch (error) {
            setIfEror('hide')
            alert('Упс помилка:(')
            console.log(error)

        }
    

    }


    let loadDataFromForm = (event) => {
        event.preventDefault();
        let note = event.target.elements.note.value;
        note = note.trim();
        if (note === '') {
            alert('Поле пусте');
            return false;
        }
        sendData({ "note": note });
    }

    const count = (event) => {
        let srringInpet = event.target.value
        setCountInput(1000 - srringInpet.length)
        if (srringInpet.length > 1000) {
            setButtunClass('hide')
            setPClass(' ')

        } else {
            setButtunClass(' ')
            setPClass('hide')
        }

    }

    return (
        <div className="row">
            <div className="col-12">
                <div className="text">
                    <form action="" onSubmit={loadDataFromForm} className={formClass}>
                        <div className="form-group">
                            <label htmlFor="note"></label>
                            <textarea name="note" className="form-control" onChange={count} placeholder='Введіть замітку' id="note"></textarea>
                            <p> Максимальна довжина {countInput} символів</p>
                            <p className={pClass}>Зменшіть кількість символів</p>
                        </div>
                        <div className="form-group text-right">
                            <div className={buttunClass}>
                                <button className='btn btn-primary' type="submit" >Cтворити</button>
                            </div>
                        </div>

                    </form>
                    <div className={lineClass}>
                        <div className="alert alert-primary" role="alert">{url}</div>
                        <p className={ifEror}>Скопіюйте код і передайте адресату.</p>
                        <div className=" text-right"><button onClick={function () { window.location.reload() }} className="btn btn-primary">Створити ще замітку</button></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Create;