import express from 'express';
import cors from 'cors';
import multer from 'multer';
//const multer = require('multer');
//const express = require('express');
//const cors = require('cors');
import pg from 'pg';
const app = express();
const PORT = 5000;

const { Pool, Client } = pg
 
const pool = new Pool({
  user: 'app-user',
  password: 'peach123',
  host: 'localhost',
  port: 5432,
  database: 'CourseMateDB',
})

console.log(await pool.query('SELECT NOW()'));

app.use(cors());
app.use(express.json()); // To parse JSON data

// Test route
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const courses = [];

// Add a course
app.post('/courses', (req, res) => {
  const course = req.body;

  // Write SQL INSERT to save course
  courses.push(course);
  res.status(201).json({ message: 'Course added successfully', course });
});

// Get all courses
app.get('/courses', (req, res) => {
  res.json(courses);
  // SQL SELECT
});

// Delete a course
app.delete('/courses/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < courses.length) {
    const deletedCourse = courses.splice(index, 1);
    res.json({ message: 'Course deleted', deletedCourse });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});


const upload = multer({ dest: 'uploads/' }); // Directory for storing uploaded files

app.post('/upload-syllabus/:courseId', upload.single('syllabus'), (req, res) => {
  const { courseId } = req.params;
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  res.json({ message: 'File uploaded successfully', file: req.file });
});
