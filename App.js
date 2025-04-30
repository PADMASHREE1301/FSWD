import React, { useState, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (count === 1000) {
        clearInterval(interval);
      } else {
        setCount(count + 1);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [count]);

  return <div>{count}</div>;
}

export default App;
