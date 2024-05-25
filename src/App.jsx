import React, { useState, useRef } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const start = () => {
    if (!isRunning) {
      const startTime = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 1000);
      setIsRunning(true);
    }
  };

  const pause = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setTime(0);
    setIsRunning(false);
    setLaps([]);
  };

  const lap = () => {
    const newLap = formatTime(time);
    setLaps([...laps, newLap]);
  };

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="container">
      <div className="stopwatch">{formatTime(time)}</div>
      <div className="buttons">
        {isRunning ? (
          <>
            <button className="button" onClick={lap}>
              Lap
            </button>
            <button className="button" onClick={pause}>
              Pause
            </button>
          </>
        ) : (
          <button className="button" onClick={start}>
            Start
          </button>
        )}
        <button className="button" onClick={reset}>
          Reset
        </button>
      </div>
      <div className="laps-container">
        <h2 className="laps-heading">Laps</h2>
        <ul>
          {laps.map((lap, index) => (
            <li className="lap-item" key={index}>{`Lap ${
              index + 1
            }: ${lap}`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
