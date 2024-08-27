// src/App.js
import React, { useState } from 'react';
import { useEffect } from 'react';
import './App.css';



function App() {
  const [message, setMessage] = useState('');

  const recordAudio = async () => {
    const response = await fetch('http://localhost:5000/record', {
      method: 'POST',
    });
    const data = await response.json();
    setMessage(data.message);
  };

  useEffect(() => {
    fetch('http://localhost:8888/')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  }, []);


  const recognizeSong = async () => {
    try {
      const response = await fetch('http://localhost:5000/recognize', {
        method: 'POST',
      });
      const data = await response.json();
      console.log(data)
      if (response.ok) {
        setMessage(`Recognized Song is ${data.song_name} and added to playlist`);  
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to recognize song');
    }
    
  };





  return (
      <div>
        <button onClick={recordAudio} >Record Audio</button>
        
        <button onClick={recognizeSong}>Add Song to Playlist</button>
        
        <p>{message}</p>
        <div className="App">
          <header className="App-header">
            <h1>React and Flask Integration</h1>
          </header>
        </div>
      </div>
    );
}

export default App;