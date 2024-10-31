import React, {useEffect, useState} from 'react';

const Calendar = () => {
  const [currentWeekStart, setCurrentWeekStart] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [tasks, setTasks] = useState({});
  const [taskDetails, setTaskDetails] = useState({
    description: '',
    course: '',
    priority: 'Medium',
  });

  const getStartOfWeek = (date) => {
    const startOfWeek = new Date(date);
    const dayOfWeek = startOfWeek.getDay();
    startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek);
    return startOfWeek;
  };

  useEffect(() => {
    setCurrentWeekStart(getStartOfWeek(new Date()));
  }, []);

  const getWeekDates = () => {
    const weekDates = [];
    const startOfWeek = new Date(currentWeekStart);
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDates.push(date);
    }
    return weekDates;
  };

  const goToNextWeek = () => {
    const nextWeekStart = new Date(currentWeekStart);
    nextWeekStart.setDate(currentWeekStart.getDate() + 7);
    setCurrentWeekStart(nextWeekStart);
  };

  const goToPreviousWeek = () => {
    const previousWeekStart = new Date(currentWeekStart);
    previousWeekStart.setDate(currentWeekStart.getDate() - 7);
    setCurrentWeekStart(previousWeekStart);
  };

  const openTaskModal = (day) => {
    setSelectedDay(day);
    setShowTaskModal(true);
  };

  const closeTaskModal = () => {
    setShowTaskModal(false);
    setTaskDetails({description: '', course: '', priority: 'Medium'});
  };

  const handleInputChange = (e) => {
    const {name, value } = e.target;
    setTaskDetails((prevDetails) => ({ ...prevDetails, [name]: value}));
  };

  const handleSubmitTask = () => {
    const dateKey = selectedDay.toDateString();
    const newTask = {...taskDetails};

    setTasks((prevTasks) => {
      const updatedTasksForDay = prevTasks[dateKey]
      ? [...prevTasks[dateKey], newTask]
      : [newTask];

      // Sort tasks by priority: High > Medium > Low
      updatedTasksForDay.sort((a,b) => {
        const priorityOrder = { High: 1, Medium: 2, Low: 3};
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
      
      return {...prevTasks, [dateKey]: updatedTasksForDay };
    });
    closeTaskModal();
  };


  const weekDates = getWeekDates();
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div className="calendar">
      <h2>Weekly Calendar</h2>
      <div className="calendar-navigation">
        <button onClick={goToPreviousWeek}>{"\u2B05"} Previous Week</button>
        <button onClick={goToNextWeek}>Next Week {"\u27A1"} </button>
      </div>
      <div className="week">
        {weekDates.map((date, index) => {
          const dateKey = date.toDateString();
          const dayTasks = tasks[dateKey] || [];

          return (
            <div key={index} className="day">
              {daysOfWeek[index]}<br />
              {date.toLocaleDateString()}<br />
              <button className="add-task-button" onClick={() => openTaskModal(date)}>+ Add Task</button>

              {/* Display tasks for the specific day, sorted by priority */}
              <ul>
                {dayTasks.map((task, taskIndex) => (
                  <li key={taskIndex}>
                    <strong>{task.priority}</strong>: {task.description}
                    {task.course && ` (Course: ${task.course})`}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      {showTaskModal && (
        <div className="modal">
          <div className="modal_content">
          <h3>Add Task for {selectedDay.toLocaleDateString()}</h3>
          <label>
            Task Description: 
            <input 
            type= "text"
            name= "description"
            value= {taskDetails.description}
            onChange={handleInputChange}
            placeholder="Enter task description"
            />
          </label>
          <label>
              Related Course (optional):
              <input
                type="text"
                name="course"
                value={taskDetails.course}
                onChange={handleInputChange}
                placeholder="Enter course name"
              />
            </label>
          <label>
              Priority Level:
              <select
                name="priority"
                value={taskDetails.priority}
                onChange={handleInputChange}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </label>
            <div className="modal-buttons">
              <button onClick={handleSubmitTask}>Save Task</button>
              <button onClick={closeTaskModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>

  );
};

export default Calendar;