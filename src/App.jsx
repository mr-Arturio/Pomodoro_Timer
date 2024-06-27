import { useState, useRef, useEffect } from 'react';

export default function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(1500); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkSession, setIsWorkSession] = useState(true);
  const [useFiveMinuteBreak, setUseFiveMinuteBreak] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (timeLeft === 0) {
      if (isWorkSession) {
        alert("Work session complete! Time for a break.");
        setTimeLeft(useFiveMinuteBreak ? 300 : 60); // 5 minutes or 1 minute break in seconds
      } else {
        alert("Break over! Time to work.");
        setTimeLeft(1500); // 25 minutes work session in seconds
      }
      setIsWorkSession(!isWorkSession);
    }
  }, [timeLeft, isWorkSession, useFiveMinuteBreak]);

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
    setTimeLeft(isWorkSession ? 1500 : useFiveMinuteBreak ? 300 : 60);
  }

  function handleCheckboxChange() {
    setUseFiveMinuteBreak(!useFiveMinuteBreak);
  }

  function handleStartBreak() {
    clearInterval(intervalRef.current);
    setIsWorkSession(false);
    setTimeLeft(useFiveMinuteBreak ? 300 : 60);
    handleStart();
  }

  function handleStartWork() {
    clearInterval(intervalRef.current);
    setIsWorkSession(true);
    setTimeLeft(1500);
    handleStart();
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="timer-container">
      <h1>{isWorkSession ? 'Work' : 'Break'} Time Left: {`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</h1>
      <button onClick={handleStart} disabled={isRunning}>
        Start
      </button>
      <button onClick={handleStop} disabled={!isRunning}>
        Stop
      </button>
      <button onClick={handleReset}>
        Reset
      </button>
      {isWorkSession ? (
        <button onClick={handleStartBreak}>
          Start Break
        </button>
      ) : (
        <button onClick={handleStartWork}>
          Start Work
        </button>
      )}
      <div>
        <label>
          <input
            type="checkbox"
            checked={useFiveMinuteBreak}
            onChange={handleCheckboxChange}
          />
          Use 5-minute breaks
        </label>
      </div>
    </div>
  );
}
