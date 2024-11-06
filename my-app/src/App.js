import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Courses from './components/Courses';
import Calendar from './components/Calendar';
//import './style.css';

function App() {
  // Start with an empty course list
  const [courses, setCourses] = useState([]);

  // Function to add a new course
  const addCourse = (course) => {
    setCourses([...courses, course]); // destructring an array
  };

  const deleteCourse = (index) =>{
    // Delete element at index
    setCourses(courses.filter((v, i) => i !== index));
  }

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
                  <Calendar />
                </section>
              </>
            }
          />
        <Route
            path="/courses"
            element={<Courses courses={courses} addCourse={addCourse} deleteCourse={deleteCourse} />}
          />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;