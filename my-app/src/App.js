import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Courses from './components/Courses';
import Calendar from './components/Calendar';
import Notes from './components/Notes';

function App() {
  const [courses, setCourses] = useState([]);
  const [tasks, setTasks] = useState({});
  const [notes, setNotes] = useState([]);

  const addCourse = (course) => setCourses([...courses, course]);

  const deleteCourse = (index) => setCourses(courses.filter((_, i) => i !== index));

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
