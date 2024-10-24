import React from 'react';
import Header from './components/Header';
import Courses from './components/Courses';
import Calendar from './components/Calendar';
//import './style.css';

function App() {
  return (
    <div className="dashboard">
      <Header />
      <Courses />
      <Calendar />
    </div>
  );
}

export default App;