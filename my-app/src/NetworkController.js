export const GetCourses = async () => {
    const url = "http://localhost:5000/courses";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error.message);
    }
}

export const AddCourse = async (course) => {
    const url = "http://localhost:5000/courses";
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(course)
        });
        if (!response.ok) {
            throw new Error(`Failed to add course, status: ${response.status}`);
        }
        return await response.json(); // Return added course or relevant response
    } catch (error) {
        console.error("Error adding course:", error.message);
        return null; // Return null or handle it based on your needs
    }
};

export const UpdateCourse = async (updatedCourseData) => {
    const url = `http://localhost:5000/courses`;
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedCourseData)
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update course, status: ${response.status}`);
      }
      return await response.json(); // Make sure it returns updated course data
    } catch (error) {
      console.error("Error updating course:", error.message);
      return null;
    }
  };
  

export const DeleteCourse = async (courseId) => {
    const url = `http://localhost:5000/courses/${courseId}`;
    try {
        const response = await fetch(url, {
            method: "DELETE"
        });
        if (!response.ok) {
            throw new Error(`Failed to delete course, status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error deleting course:", error.message);
        return null;
    }
};

