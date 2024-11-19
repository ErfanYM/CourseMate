import express from 'express';
import cors from 'cors';
import multer from 'multer';
import pg from 'pg';
import path from 'path';
import _ from 'lodash';

const app = express();
const PORT = 5000;

const { Pool } = pg;

const pool = new Pool({
  user: 'app-user',
  password: 'peach123',
  host: 'localhost',
  port: 5432,
  database: 'CourseMateDB',
});

// Use async function to handle DB query
const testDatabaseConnection = async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Connected to the database:', res.rows[0].now);
  } catch (err) {
    console.error('Error connecting to the database', err);
  }
};

// Call function to test DB connection
testDatabaseConnection();

app.use(cors());
app.use(express.json()); // To parse JSON data

// Test route
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Add a course
app.post('/courses', async (req, res) => {
  const { name, credits, term, professorName, location } = req.body;

  try {
    // Insert course details into the database
    const query = 'INSERT INTO public."Course" ("Name", "Credits", "Term", "ProfessorName", "Location") VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [name, credits, term, professorName, location];
    const result = await pool.query(query, values);

    res.status(201).json({ message: 'Course added successfully', course: result.rows[0] });
  } catch (err) {
    console.error('Error adding course', err);
    res.status(500).json({ message: 'Error adding course' });
  }
});

// Get all courses
app.get('/courses', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM public."Course";');
    const camelCaseResponse = result.rows.map(course => convertCamelCase(course));
    res.json(camelCaseResponse);
  } catch (err) {
    console.error('Error fetching courses', err);
    res.status(500).json({ message: 'Error fetching courses' });
  }
});

// Delete a course
app.delete('/courses/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM public."Course" WHERE Id = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json({ message: 'Course deleted', deletedCourse: result.rows[0] });
  } catch (err) {
    console.error('Error deleting course', err);
    res.status(500).json({ message: 'Error deleting course' });
  }
});

app.patch('/courses', async (req, res) => {
  const { name, credits, term, professorName, location, syllabus, id } = req.body;

  try {
    const result = await pool.query('UPDATE public."Course" SET "Name"=$1, "Credits"=$2, "Term"=$3, "ProfessorName"=$4, "Location"=$5, "Syllabus"=$6 WHERE Id=$7 RETURNING *;', [name, credits, term, professorName, location, syllabus, id]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Course not found'});
    }

    res.json({ message: 'Course updated', updatedCourse: result.rows[0] });
  } catch (err) {
    console.error('Error updating course', err);
    res.status(500).json({ message: 'Error updating course' });
  }
})

// Upload syllabus
const upload = multer({ dest: 'uploads/' }); // Directory for storing uploaded files

app.post('/upload-syllabus/:courseId', upload.single('syllabus'), async (req, res) => {
  const { courseId } = req.params;
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const syllabusPath = path.join('uploads', req.file.filename);

  try {
    // Update course with the uploaded syllabus path
    const query = 'UPDATE course SET syllabus = $1 WHERE id = $2 RETURNING *';
    const values = [syllabusPath, courseId];
    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json({ message: 'File uploaded and syllabus updated successfully', file: req.file, course: result.rows[0] });
  } catch (err) {
    console.error('Error uploading syllabus', err);
    res.status(500).json({ message: 'Error uploading syllabus' });
  }
});

const convertCamelCase = (obj) => {
  return _.mapKeys(obj, (val, key) => {
    return _.camelCase(key);
  })
}
