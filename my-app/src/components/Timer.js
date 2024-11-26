// src/components/PomodoroTimer.js
import React, { useState, useEffect } from 'react';

const PomodoroTimer = () => {
  const [workDuration, setWorkDuration] = useState(25);  // Default to 25 minutes
  const [breakDuration, setBreakDuration] = useState(5);  // Default to 5 minutes
  const [timeLeft, setTimeLeft] = useState(workDuration * 60);  // Time in seconds
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    if (timeLeft === 0) {
      if (isBreak) {
        setTimeLeft(workDuration * 60);  // Reset to work duration after break
        setIsBreak(false);
      } else {
        setTimeLeft(breakDuration * 60);  // Reset to break duration after work
        setIsBreak(true);
      }
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, workDuration, breakDuration, isBreak]);

  const handleStartPause = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setIsBreak(false);
    setTimeLeft(workDuration * 60);
  };

  const handleWorkDurationChange = (e) => {
    setWorkDuration(Number(e.target.value));
    setTimeLeft(Number(e.target.value) * 60); // Update time left when duration is changed
  };

  const handleBreakDurationChange = (e) => {
    setBreakDuration(Number(e.target.value));
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' + minutes : minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;
  };

  return (
    <div className="pomodoro-timer">
      <h1>Pomodoro Timer</h1>
      
      <div>
        <label>Work Duration (min): </label>
        <input
          type="number"
          value={workDuration}
          onChange={handleWorkDurationChange}
          min="1"
        />
      </div>
      
      <div>
        <label>Break Duration (min): </label>
        <input
          type="number"
          value={breakDuration}
          onChange={handleBreakDurationChange}
          min="1"
        />
      </div>

      <div>
        <h2>{isBreak ? 'Break Time!' : 'Work Time!'}</h2>
        <p>{formatTime(timeLeft)}</p>
      </div>

      <button onClick={handleStartPause}>
        {isActive ? 'Pause' : 'Start'}
      </button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default PomodoroTimer;
