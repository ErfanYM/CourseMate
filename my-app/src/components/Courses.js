import React, { useState } from 'react';

// Define a functional component named 'Courses' that accepts props 'courses' and 'addCourse'.
const Courses = ({ courses, addCourse, deleteCourse, updateCourse }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // New state to track if we're editing a course
  const [currentCourseIndex, setCurrentCourseIndex] = useState(null); // New state to track which course is being edited

  const [courseDetails, setCourseDetails] = useState({
    title: '',
    credits: '',
    term: 'F',
    professor: '',
    location: '',
    syllabus: null,
  });

  const openModal = (courseIndex = null) => {
    if (courseIndex !== null) { // Check if we have a course index, indicating edit mode
      setIsEditing(true); // Set edit mode to true
      setCurrentCourseIndex(courseIndex); // Track the index of the course being edited
      setCourseDetails({ ...courses[courseIndex] }); // Populate form with existing course data
    } else {
      setIsEditing(false); // Set edit mode to false for adding a new course
      setCourseDetails({
        title: '',
        credits: '',
        term: 'F',
        professor: '',
        location: '',
        syllabus: null,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCourseDetails({
      title: '',
      credits: '',
      term: 'F',
      professor: '',
      location: '',
      syllabus: null,
    });
    setIsEditing(false); // Reset edit mode
    setCurrentCourseIndex(null); // Clear the current course index
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setCourseDetails({
      ...courseDetails,
      [name]: type === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) { // Check if we're in edit mode
      updateCourse(currentCourseIndex, courseDetails); // Update the existing course
    } else {
      addCourse(courseDetails); // Add a new course
    }
    closeModal(); // Close the modal after submission
  };

  const deleteCourseHandler = (index) => {
    deleteCourse(index);
  };

  return (
    <div className="courses-section">
      <h2>Your Courses</h2>
      <div className="courses">
        {courses.length > 0 ? courses.map((course, index) => (
          <div key={index} className="course-card">
            <h3>{course.title} - {course.term}</h3>
            <p>Credits: {course.credits}</p>
            <p>Prof: {course.professor}</p>
            <p>Location: {course.location}</p>
            <button onClick={() => deleteCourseHandler(index)}>Remove</button>
            <button onClick={() => openModal(index)}>Edit</button> {/* New button to open edit modal */}
          </div>
        )) : <p>No courses added yet.</p>}
        <button onClick={() => openModal()} className="add-course-btn">+ Add Course</button>
      </div>

      {isModalOpen && (
        <div className="modal-background">
          <div className="modal-content">
            <h2>{isEditing ? 'Edit Course' : 'Add Course'}</h2> {/* Display 'Edit Course' if in edit mode */}
            <form onSubmit={handleSubmit}>
              <label>
                Course Name:
                <input
                  type="text"
                  name="title"
                  value={courseDetails.title}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Credits:
                <input
                  type="number"
                  name="credits"
                  value={courseDetails.credits}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Term (F or W):
                <select
                  name="term"
                  value={courseDetails.term}
                  onChange={handleChange}
                >
                  <option value="F">Fall</option>
                  <option value="W">Winter</option>
                </select>
              </label>
              <label>
                Professor Name:
                <input
                  type="text"
                  name="professor"
                  value={courseDetails.professor}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Location:
                <input
                  type="text"
                  name="location"
                  value={courseDetails.location}
                  onChange={handleChange}
                />
              </label>
              <label>
                Syllabus:
                <input
                  type="file"
                  name="syllabus"
                  onChange={handleChange}
                />
              </label>
              <div className="modal-buttons">
                <button type="button" onClick={closeModal}>Cancel</button>
                <button type="submit">{isEditing ? 'Update Course' : 'Add Course'}</button> {/* Show 'Update' if in edit mode */}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
