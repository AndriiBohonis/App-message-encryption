function Main() {
    return (
        <div className="row">
            <div className="col-9">
                <div className="text">
                    <ul className="row button-list">
                        <li className="col-6"><a href="/create" type=" button" className="btn btn-primary">Створити замітку</a></li>
                        <li className="col-6"><a href="/note" type=" button" className="btn btn-primary">Переглянути замітку</a></li>
                    </ul>
                </div>

                <div className="text">
                    <p><b>ShareNotes</b> – сервіс для обміну замітками. Створіть замітку, відправте ссилку на замітку і ваш друг зможе її переглянути.
                        Після перешгяду замітка буде видалина.</p>
                    <p>Як створити замітку? </p>
                    <ul>
                        <li>Перейдіть по ссилці</li>
                        <li>Вставте текст і нажміть Створити</li>
                        <li>Відправте згенерований код другу!</li>
                    </ul>

                </div>
            </div>
        </div>
    );
}

export default Main;