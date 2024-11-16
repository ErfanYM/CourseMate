import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Courses from './components/Courses';
import Calendar from './components/Calendar';
//import './style.css';

function App() {
  // Start with an empty course list
  const [courses, setCourses] = useState([]);

  const [tasks, setTasks] = useState({});


  // Function to add a new course
  const addCourse = (course) => {
    setCourses([...courses, course]); // destructring an array
  };

  const deleteCourse = (index) =>{
    // Delete element at index
    setCourses(courses.filter((_, i) => i !== index));
  }

  const addOrUpdateTask = (dateKey, task, editIndex = null) => {
    setTasks((prevTasks) => {
      const updatedTasksForDay = prevTasks[dateKey] ? [...prevTasks[dateKey]] : [];
      
      if (editIndex !== null) {
        updatedTasksForDay[editIndex] = task; // Edit existing task
      } else {
        updatedTasksForDay.push(task); // Add new task
      }

      updatedTasksForDay.sort((a, b) => {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });

      return { ...prevTasks, [dateKey]: updatedTasksForDay };
    });
  };

  const deleteTask = (dateKey, taskIndex) => {
    setTasks((prevTasks) => {
      const updatedTasksForDay = prevTasks[dateKey].filter((_, index) => index !== taskIndex);
      return { ...prevTasks, [dateKey]: updatedTasksForDay };
    });
  };

  return (
    <Router>
      <Header />
      <div className="main-container">
        <Routes>
        <Route
            path="/"
            element={
              <>
                <section className="courses-section">
                  <Courses courses={courses} addCourse={addCourse} deleteCourse={deleteCourse} />
                </section>
                <section className="calendar-section">
                  <Calendar 
                    tasks={tasks} 
                    addOrUpdateTask={addOrUpdateTask} 
                    deleteTask={deleteTask}
                  />
                </section>
              </>
            }
          />
        <Route
            path="/courses"
            element={
              <Courses
                courses={courses}
                addCourse={addCourse}
                deleteCourse={deleteCourse}
              />
            }
          />
          <Route
            path="/calendar"
            element={<Calendar tasks={tasks} addOrUpdateTask={addOrUpdateTask} deleteTask={deleteTask} />}
          />
        </Routes>
      </div>
    </Router>

    
  );
}

export default App;