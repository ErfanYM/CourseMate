import React, { useState } from 'react';

// Define a functional component named 'Courses' that accepts props 'courses' and 'addCourse'.
const Courses = ({ courses, addCourse, deleteCourse, updateCourse }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCourseId, setcurrentCourseId] = useState(null);

  console.log(courses);

  const [courseDetails, setCourseDetails] = useState({
    name: '',
    credits: '',
    term: 'F',
    professorName: '',
    location: '',
    syllabus: null,
  });

  const openModal = (courseIndex = null) => {
    if (courseIndex !== null) {
      setIsEditing(true);
      setcurrentCourseId( courses[courseIndex].id );
      setCourseDetails({ ...courses[courseIndex] });  // Populate form with existing course data for editing
    } else {
      setIsEditing(false);
      setCourseDetails({
        name: '',
        credits: '',
        term: 'F',
        professorName: '',
        location: '',
        syllabus: null,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCourseDetails({
      name: '',
      credits: '',
      term: 'F',
      professorName: '',
      location: '',
      syllabus: null,
    });
    setIsEditing(false); // Reset edit mode
    setcurrentCourseId(null); // Clear the current course index
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
      const newCourse = courseDetails;
      updateCourse({id: currentCourseId, ...newCourse});
    } else {
      addCourse(courseDetails);
    }
    closeModal(); // Close the modal after submission
  };

  return (
    <div className="courses-section">
      <h2>Your Courses</h2>
      <div className="courses">
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <div key={index} className="course-card">
              <h3>
                {course.name} - {course.term}
              </h3>
              <p>Credits: {course.credits}</p>
              <p>Prof: {course.professorName}</p>
              <p>Location: {course.location}</p>
              <button onClick={() => deleteCourse(course.id)}>Remove</button>
              <button onClick={() => openModal(index)}>Edit</button>
            </div>
          ))
        ) : (
          <p>No courses added yet.</p>
        )}
        <button onClick={() => openModal()} className="add-course-btn">
          + Add Course
        </button>
      </div>

      {isModalOpen && (
        <div className="modal-background">
          <div className="modal-content">
            <h2>{isEditing ? 'Edit Course' : 'Add Course'}</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Course Name:
                <input
                  type="text"
                  name="name"
                  value={courseDetails.name}
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
                  name="professorName"
                  value={courseDetails.professorName}
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
                <input type="file" name="syllabus" onChange={handleChange} />
              </label>
              <div className="modal-buttons">
                <button type="button" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit">
                  {isEditing ? 'Update Course' : 'Add Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
