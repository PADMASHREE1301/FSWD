import React, { useState, useEffect } from 'react';
import './App.css';


function App() {
  const [count, setCount] = useState(0);

  // useEffect to simulate the setInterval behavior
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prevCount => {
        if (prevCount === 1000) {
          clearInterval(interval); // Stop when count reaches 1000
          return prevCount;
        }
        return prevCount + 1;
      });
    }, 1); // Update every 1 millisecond

    // Cleanup function to clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Fullstack</h1>
      <p>COUNTS</p>
      <div id="counter">{count}</div>
    </div>
  );
}

export default App;
