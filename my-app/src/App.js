import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Courses from './components/Courses';
import Calendar from './components/Calendar';
import { AddCourse, DeleteCourse, GetCourses, UpdateCourse } from "./NetworkController";
//import './style.css';
import Notes from './components/Notes';
import Timer from './components/Timer'; // Import the Pomodoro Timer

function App() {
  const [courses, setCourses] = useState([]);
  const [tasks, setTasks] = useState({});
  const [notes, setNotes] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('darkMode') === 'true');

  // On page load, get all of our courses
  useEffect(() => {
    refreshCourses();
  }, []);

  // Apply dark mode class to body when dark mode state changes
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'false');
    }
  }, [isDarkMode]);

  const refreshCourses = () => {
    GetCourses().then(res => {
      setCourses(res);
    })
  }

  // Function to add a new course
  const addCourse = (course) => {
    AddCourse(course).then(res => {
      refreshCourses();
    })
  };

  const updateCourse = (course) => {
    UpdateCourse(course).then(res => {
      refreshCourses();
    })
  }

  const deleteCourse = (id) => {
    DeleteCourse(id).then(res => {
      refreshCourses();
    })
  }

  const addOrUpdateTask = (dateKey, task, editIndex = null) => {
    setTasks((prevTasks) => {
      const updatedTasksForDay = prevTasks[dateKey] ? [...prevTasks[dateKey]] : [];
      if (editIndex !== null) {
        updatedTasksForDay[editIndex] = task;
      } else {
        updatedTasksForDay.push(task);
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

  const addNote = (note) => setNotes([...notes, note]);

  const deleteNote = (index) => setNotes(notes.filter((_, i) => i !== index));

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(prevState => !prevState);
  };

  return (
    <Router>
      <Header />
      <div className="main-container">
      <button onClick={toggleDarkMode} className="dark-mode-toggle">
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <section className="courses-section">
                  <Courses courses={courses} addCourse={addCourse} deleteCourse={deleteCourse} updateCourse={updateCourse} />
                </section>
                <section className="calendar-section">
                  <Calendar tasks={tasks} addOrUpdateTask={addOrUpdateTask} deleteTask={deleteTask} />
                </section>
              </>
            }
          />
          <Route
            path="/courses"
            element={
              <Courses courses={courses} addCourse={addCourse} deleteCourse={deleteCourse} />
            }
          />
          <Route
            path="/calendar"
            element={<Calendar tasks={tasks} addOrUpdateTask={addOrUpdateTask} deleteTask={deleteTask} />}
          />
          <Route
            path="/notes"
            element={<Notes notes={notes} addNote={addNote} deleteNote={deleteNote} />}
          />
          <Route
            path="/timer"
            element={<Timer />} // Add the Pomodoro Timer as its own route
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;