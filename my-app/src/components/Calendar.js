import React from 'react';

const Calendar = () => (
  <section className="calendar">
    <h3>Calendar</h3>
    <div className="calendar-controls">
      <select>
        <option>Select: Month</option>
      </select>
      <select>
        <option>Select: Year</option>
      </select>
    </div>
    <div className="week">
      <div className="day">Sunday<br />+ Add Task</div>
      <div className="day">Monday<br />+ Add Task</div>
      <div className="day">Tuesday<br />+ Add Task</div>
      <div className="day">Wednesday<br />+ Add Task</div>
      <div className="day">Thursday<br />+ Add Task</div>
      <div className="day">Friday<br />+ Add Task</div>
      <div className="day">Saturday<br />+ Add Task</div>
    </div>
  </section>
);

export default Calendar;