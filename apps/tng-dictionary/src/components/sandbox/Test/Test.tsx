import React from 'react';

function App() {
  let audio = new Audio('https://be.tsilhqotinlanguage.ca:3003/download?id=BA_bagwezzed_1131.mp3')

  function start(): void {
    audio.play();
  }

  return (
    < div >
      <button onClick={start}>Play</button>
    </div >
  );
}

export default App;


