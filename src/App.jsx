import React, { useState } from 'react';
import { getZodiacSign } from './utils/zodiac';
import { getFortune } from './utils/fortune';
import BirthdayForm from './components/BirthdayForm';
import FortuneResult from './components/FortuneResult';

function App() {
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [zodiacSign, setZodiacSign] = useState(null);
  const [fortune, setFortune] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const sign = getZodiacSign(parseInt(month), parseInt(day));
    const todaysFortune = getFortune(sign.name);
    setZodiacSign(sign);
    setFortune(todaysFortune);
  };

  return (
    <div className="App">
      <h1>✧ 星からのメッセージ ✧</h1>
      <p className="subtitle">誕生日を入れてね</p>
      <BirthdayForm 
        month={month}
        day={day}
        setMonth={setMonth}
        setDay={setDay}
        onSubmit={handleSubmit}
      />
      {zodiacSign && fortune && (
        <FortuneResult 
          zodiacSign={zodiacSign}
          fortune={fortune}
        />
      )}
    </div>
  );
}

export default App;