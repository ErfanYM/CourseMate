import React, { useState } from 'react';
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
    <div>
      <Header />
      <div className="main-container">
        <section className="courses-section">
          <Courses courses={courses} addCourse={addCourse} deleteCourse={deleteCourse}/>
        </section>
        <section className="calendar-section">
          <Calendar />
        </section>
      </div>
    </div>
  );
}

export default App;