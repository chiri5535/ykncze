import React from 'react';

function BirthdayForm({ month, day, setMonth, setDay, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="birthday-form">
      <div className="date-inputs">
        <select 
          value={month} 
          onChange={(e) => setMonth(e.target.value)}
          required
        >
          <option value="">月</option>
          {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
            <option key={m} value={m}>{m}月</option>
          ))}
        </select>
        <select 
          value={day} 
          onChange={(e) => setDay(e.target.value)}
          required
        >
          <option value="">日</option>
          {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
            <option key={d} value={d}>{d}日</option>
          ))}
        </select>
      </div>
      <button type="submit">占う</button>
    </form>
  );
}

export default BirthdayForm;