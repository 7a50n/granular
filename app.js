import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import axios from 'axios';

function App() {
  const [userId, setUserId] = useState(null);
  const [status, setStatus] = useState('');

  const createPass = async () => {
    const res = await axios.post('http://localhost:5000/api/create-pass');
    setUserId(res.data.userId);
  };

  const clockIn = async () => {
    await axios.post('http://localhost:5000/api/clock-in', { userId });
    setStatus('Clocked in');
  };

  const clockOut = async () => {
    const res = await axios.post('http://localhost:5000/api/clock-out', { userId });
    setStatus(`Clocked out, duration: ${res.data.durationHours.toFixed(2)} hrs`);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Venue Access Pass</h1>
      <button onClick={createPass} className="bg-blue-500 text-white p-2 rounded mb-2">Create Pass</button>
      {userId && (
        <div>
          <QRCode value={userId} size={256} />
          <div className="mt-2">Pass ID: {userId}</div>
          <button onClick={clockIn} className="bg-green-500 text-white p-2 rounded mr-2 mt-2">Clock In</button>
          <button onClick={clockOut} className="bg-red-500 text-white p-2 rounded mt-2">Clock Out</button>
          <div className="mt-2">{status}</div>
        </div>
      )}
    </div>
  );
}

export default App;
// This prototype provides a base to expand into user accounts, payment tracking, and admin/venue interfaces.
