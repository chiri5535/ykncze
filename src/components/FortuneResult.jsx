import React from 'react';

function FortuneResult({ zodiacSign, fortune }) {
  return (
    <div className="result">
      <img src={zodiacSign.image} alt={zodiacSign.name} className="zodiac-image" />
      <h2>あなたの星座: {zodiacSign.name}</h2>
      <p>ラッキーカラー: {zodiacSign.lucky}</p>
      <h3>2026年6月の運勢:</h3>
      <p>{fortune.text}</p>
      <p>運勢スコア: {'⭐️'.repeat(fortune.score)}</p>
      <h4>アドバイス:</h4>
      <p>{fortune.advice}</p>
      <p>ラッキーアイテム: {fortune.luckyItem}</p>
    </div>
  );
}

export default FortuneResult;
