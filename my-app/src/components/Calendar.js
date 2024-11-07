import React, {useEffect, useState} from 'react';

const Calendar = ({ tasks, addOrUpdateTask, deleteTask }) => {
  const [currentWeekStart, setCurrentWeekStart] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  // const [tasks, setTasks] = useState({});
  const [taskDetails, setTaskDetails] = useState({
    description: '',
    course: '',
    priority: 'Medium',
  });
  const [selectedDays, setSelectedDays] = useState([]);
  const[isEditing, setIsEditing] = useState(false);
  const[editIndex, setEditIndex] = useState(null);

  // const daysOfWeek= ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

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

  const openTaskModal = (day, task = null, index = null) => {
    setSelectedDay(day);
    if(task){
      setTaskDetails(task);
      setIsEditing(true);
      setEditIndex(index);
      setSelectedDays(task.days || []); // Set selected days if editing an existing task
    }
    else{
      setTaskDetails({ description: '', course: '', priority: 'Medium' });
      setIsEditing(false);
      setEditIndex(null);
      setSelectedDays([]);
    }
    setShowTaskModal(true);
  };

  const closeTaskModal = () => {
    setShowTaskModal(false);
    setTaskDetails({description: '', course: '', priority: 'Medium'});
    setSelectedDays([])
  };

  const handleInputChange = (e) => {
    const {name, value } = e.target;
    setTaskDetails((prevDetails) => ({ ...prevDetails, [name]: value}));
  };
  const toggleDaySelection=(dayIndex) => {
    setSelectedDays((prevDays) => 
      prevDays.includes(dayIndex) 
      ? prevDays.filter((day) => day !== dayIndex) //Remove day if already selected
      : [...prevDays, dayIndex]                    //Add day if not selected
    );
  };

  const handleSubmitTask = () => {
    // const dateKey = selectedDay.toDateString();
    const newTask = {...taskDetails , days: selectedDays};
   
    // Add or update the task on each selected day
    selectedDays.forEach((dayIndex) => {
      const dateKey = getWeekDates()[dayIndex].toDateString(); // Get the specific date for each selected day
    addOrUpdateTask(dateKey, newTask, isEditing ? editIndex : null);
    });
    // addOrUpdateTask(dateKey, newTask, isEditing ? editIndex : null);

    closeTaskModal();
  };

  const handleDeleteTask = () => {
    // const dateKey = selectedDay.toDateString();

    deleteTask(selectedDay, editIndex);

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
                    <button onClick={() => openTaskModal(date, task, taskIndex)} style={{marginLeft: '10px'}}>Edit</button>
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
            placeholder="Task"
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
          <div className="days-select">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                <button
                  key={index}
                  onClick={() => toggleDaySelection(index)}
                  className={selectedDays.includes(index) ? "selected" : ""}
                >
                  {day}
                </button>
              ))}
          </div>
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
              <button onClick={handleSubmitTask}>{isEditing ? "Save Changes" : "Save Task"}</button>
              {isEditing && (
                <button onClick={handleDeleteTask} style={{ backgroundColor: '#d9534f', color: 'white', marginLeft: '10px' }}>Delete Task</button>
              )}
              <button onClick={closeTaskModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>

  );
};

export default Calendar;