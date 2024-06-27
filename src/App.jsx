import { useState, useRef, useEffect } from 'react';

export default function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(1500); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkSession, setIsWorkSession] = useState(true);
  const [workDuration, setWorkDuration] = useState(1500); // 25 minutes
  const [breakDuration, setBreakDuration] = useState(300); // 5 minutes
  const [completedWorkSessions, setCompletedWorkSessions] = useState(0);
  const [completedBreakSessions, setCompletedBreakSessions] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (timeLeft === 0) {
      if (isWorkSession) {
        alert("Work session complete! Time for a break.");
        setCompletedWorkSessions(prev => prev + 1);
        setTimeLeft(breakDuration);
      } else {
        alert("Break over! Time to work.");
        setCompletedBreakSessions(prev => prev + 1);
        setTimeLeft(workDuration);
      }
      setIsWorkSession(!isWorkSession);
      setIsRunning(false);
      clearInterval(intervalRef.current);
    }
  }, [timeLeft, isWorkSession, breakDuration, workDuration]);

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
    setTimeLeft(isWorkSession ? workDuration : breakDuration);
  }

  function handleStartBreak() {
    clearInterval(intervalRef.current);
    setIsWorkSession(false);
    setTimeLeft(breakDuration);
    handleStart();
  }

  function handleStartWork() {
    clearInterval(intervalRef.current);
    setIsWorkSession(true);
    setTimeLeft(workDuration);
    handleStart();
  }

  const handleWorkDurationChange = (e) => {
    const newDuration = Number(e.target.value) * 60;
    setWorkDuration(newDuration);
    if (isWorkSession) {
      setTimeLeft(newDuration);
    }
  };

  const handleBreakDurationChange = (e) => {
    const newDuration = Number(e.target.value) * 60;
    setBreakDuration(newDuration);
    if (!isWorkSession) {
      setTimeLeft(newDuration);
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="timer-container">
      <h1>{isWorkSession ? 'Work' : 'Break'} Time Left: {`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</h1>
      <button className="start" onClick={handleStart} disabled={isRunning}>
        Start
      </button>
      <button className="stop" onClick={handleStop} disabled={!isRunning}>
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
          Work Duration:
          <input
            type="number"
            value={workDuration / 60}
            onChange={handleWorkDurationChange}
            min="1"
          /> minutes
        </label>
      </div>
      <div>
        <label>
          Break Duration:
          <input
            type="number"
            value={breakDuration / 60}
            onChange={handleBreakDurationChange}
            min="1"
          /> minutes
        </label>
      </div>
      <div>
        <p>Completed Work Sessions: {completedWorkSessions}</p>
        <p>Completed Break Sessions: {completedBreakSessions}</p>
      </div>
    </div>
  );
}
