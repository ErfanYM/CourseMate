import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="dashboard-header">
      <h1>CourseMate</h1>
      <nav className='nav-links'>
      <Link to="/" className="nav-button">Home</Link> {/* Link to Main Page */}
        <Link to="/Courses" className='nav-button'>My Courses</Link>
        <Link to="/Calendar" className='nav-button'>Calender</Link>
        <Link to="/Notes" className='nav-button'>Notes</Link>
        <Link to="/timer" className='nav-button'>Timer</Link>
      </nav>
      
    </header>
    
  );
};

export default Header;