import React, { useState } from 'react';

// Define a functional component named 'Courses' that accepts props 'courses' and 'addCourse'.
const Courses = ({ courses, addCourse, deleteCourse }) => {
  // State to manage the modal's open/closed status.
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State to manage the details of the course being added.
  const [courseDetails, setCourseDetails] = useState({
    title: '',        // Course title
    credits: '',      // Number of credits for the course
    term: 'F',        // Default term set to 'F' (Fall)
    professor: '',    // Professor's name
    location: ''      // Course location
  });

  // Function to open the modal for adding a new course.
 const openModal = () => {
   setIsModalOpen(true);
  };

  // Function to close the modal and reset the course details state.
  const closeModal = () => {
    setIsModalOpen(false);
    setCourseDetails({ title: '', credits: '', term: 'F', professor: '', location: '' });
  };

  // Function to handle changes in the input fields and update courseDetails state.
  const handleChange = (e) => {
    setCourseDetails({
      ...courseDetails, // Spread the existing course details
      [e.target.name]: e.target.value // Update the specific field that changed
    });
  };

  // Function to handle form submission.
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    addCourse(courseDetails); // Call the addCourse function passed via props with the courseDetails
    closeModal(); // Close the modal after submission

  };

const deleteCourseHandler = (index) =>{
  deleteCourse(index);
}


  return (
    <div className="courses-section">
      <h2>Your Courses</h2>
      <div className="courses">
        {/* Check if there are courses to display; if yes, map over them, otherwise show a message */}
        {courses.length > 0 ? courses.map((course, index) => (
          <div key={index} className="course-card"> {/* Each course is displayed in a card format */}
            <h3>{course.title} - {course.term}</h3> {/* Course title and term */}
            <p>Credits: {course.credits}</p> {/* Course credits */}
            <p>Prof: {course.professor}</p> {/* Professor's name */}
            <p>Location: {course.location}</p> {/* Course location */}
            <button onClick={() => deleteCourseHandler(index)}>Delete</button>



          </div>
        )) : <p>No courses added yet.</p>} {/* Message when there are no courses */}

        {/* Button to open the modal for adding a new course */}
        <button onClick={openModal} className="add-course-btn">+ Add Course</button>
      </div>

      {/* Conditional rendering of the modal for adding a course */}
      {isModalOpen && (
        <div className="modal-background"> {/* Modal background for overlay effect */}
          <div className="modal-content"> {/* Modal content container */}
            <h2>Add Course</h2>
            <form onSubmit={handleSubmit}> {/* Form to add a new course */}
              <label>
                Course Name:
                <input
                  type="text"
                  name="title"
                  value={courseDetails.title} // Bind value to course title
                  onChange={handleChange} // Update state on change
                  required // Make the field mandatory
                />
              </label>
              <label>
                Credits:
                <input
                  type="number"
                  name="credits"
                  value={courseDetails.credits} // Bind value to credits
                  onChange={handleChange} // Update state on change
                  required // Make the field mandatory
                />
              </label>
              <label>
                Term (F or W):
                <select
                  name="term"
                  value={courseDetails.term} // Bind value to term
                  onChange={handleChange} // Update state on change
                >
                  <option value="F">Fall</option> {/* Option for Fall term */}
                  <option value="W">Winter</option> {/* Option for Winter term */}
                </select>
              </label>
              <label>
                Professor Name:
                <input
                  type="text"
                  name="professor"
                  value={courseDetails.professor} // Bind value to professor's name
                  onChange={handleChange} // Update state on change
                  required // Make the field mandatory
                />
              </label>
              <label>
                Location:
                <input
                  type="text"
                  name="location"
                  value={courseDetails.location} // Bind value to location
                  onChange={handleChange} // Update state on change
                  required // Make the field mandatory
                />
              </label>
              <div className="modal-buttons">
                <button type="button" onClick={closeModal}>Cancel</button> {/* Button to cancel and close modal */}
                <button type="submit">Add Course</button> {/* Button to submit the form */}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Export the Courses component for use in other parts of the application.
export default Courses;
