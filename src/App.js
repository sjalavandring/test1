import {useState, useEffect} from 'react'

function App() {
  let [isTimerActive, setTimerActive] = useState(false)  //Статуст таймера (запущен или нет)
  let [enteredTime, setEnteredTime] = useState(0) //Введенное число секунд
  let [remainTime, setRemainTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  }) //Оставшееся время в часах минутах и секуендах

  function calcRemainTime(time) {
    if (!!Number(time) && Number(time) > 0) {   //Проверка, является ли вводимая строка целым числом
      setRemainTime({
        hours: (time >= 3600 ?  Math.floor(time / 3600) % 24 : 0),
        minutes: (time >= 60 ? Math.floor(time / 60) % 60 : 0),
        seconds:  Math.floor(time % 60 ),
      })
    } else {
      setRemainTime({
        hours: 0,
        minutes: 0,
        seconds: 0,
      })
    }
  }  //функция для преобразования введенных секунд в часы, минуты и секунды + проверка соответствия формата введенных данных

  useEffect(() => {
    if (enteredTime < 0) {
      setTimerActive(false)
    }
    if (isTimerActive) {
      setTimeout(() => setEnteredTime((currentTime) => (currentTime - 1)), 1000)
      calcRemainTime(enteredTime)
    }
  }, [isTimerActive, enteredTime])  //при изменении стаатуса таймера в "активен", каждую секунду время будет уменьшаться на 1 секунду, пока статус таймера не изменится обратно

  return (
    <div className="App">
        <input placeholder="Seconds" type="text" onChange={
          event => {
            calcRemainTime(event.target.value)
            setEnteredTime(event.target.value)
            setTimerActive(false)
          }
        }/>
        <button onClick={() => setTimerActive(true)}>Start</button>
        <br/>
        <span>{`${remainTime.hours < 10 ? '0' + remainTime.hours : remainTime.hours}:${remainTime.minutes < 10 ? '0' + remainTime.minutes : remainTime.minutes}:${remainTime.seconds < 10 ? '0' + remainTime.seconds : remainTime.seconds}`}</span>
    </div>
  );
}

export default App;
