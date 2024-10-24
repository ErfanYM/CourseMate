import React from 'react';

const Calendar = () => {
  return (
    <div className="calendar">
      <h2>Weekly Calendar</h2>
      <div className="week">
        <div className="day">Sunday<br />+ Add Task</div>
        <div className="day">Monday<br />+ Add Task</div>
        <div className="day">Tuesday<br />+ Add Task</div>
        <div className="day">Wednesday<br />+ Add Task</div>
        <div className="day">Thursday<br />+ Add Task</div>
        <div className="day">Friday<br />+ Add Task</div>
        <div className="day">Saturday<br />+ Add Task</div>
      </div>
    </div>
  );
};

export default Calendar;