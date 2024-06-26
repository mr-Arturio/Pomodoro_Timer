import { useState, useRef, useEffect } from 'react';

export default function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(1500); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkSession, setIsWorkSession] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (timeLeft === 0) {
      if (isWorkSession) {
        alert("Work session complete! Time for a break.");
        setTimeLeft(300); // 5 minutes break in seconds
      } else {
        alert("Break over! Time to work.");
        setTimeLeft(1500); // 25 minutes work session in seconds
      }
      setIsWorkSession(!isWorkSession);
    }
  }, [timeLeft, isWorkSession]);

  function handleStart() {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
      }, 1000);
    }
  }

  function handleStop() {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  }

  function handleReset() {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTimeLeft(isWorkSession ? 1500 : 300);
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <>
      <h1>{isWorkSession ? 'Work' : 'Break'} Time Left: {`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</h1>
      <button onClick={handleStart}>
        Start
      </button>
      <button onClick={handleStop}>
        Stop
      </button>
      <button onClick={handleReset}>
        Reset
      </button>
    </>
  );
}
