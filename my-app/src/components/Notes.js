import React, { useState } from 'react';


const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  // Add or update note function
  const handleAddOrUpdateNote = () => {
    if (editIndex !== null) {
      // Update an existing note
      const updatedNotes = [...notes];
      updatedNotes[editIndex] = noteText;
      setNotes(updatedNotes);
      setEditIndex(null); // Reset edit mode
    } else {
      // Add a new note
      setNotes([...notes, noteText]);
    }
    setNoteText(''); // Clear the input field
  };

  // Start editing a note
  const handleEditNote = (index) => {
    setEditIndex(index);
    setNoteText(notes[index]); // Populate input with the current note text
  };

  // Delete a note
  const handleDeleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  return (
    <div className="notes-container">
      <h2>Notes</h2>
      <div className="notes-input">
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Write your note here..."
        ></textarea>
        <button onClick={handleAddOrUpdateNote}>
          {editIndex !== null ? 'Update Note' : 'Add Note'}
        </button>
      </div>
      <ul className="notes-list">
        {notes.map((note, index) => (
          <li key={index}>
            <span>{note}</span>
            <div>
              <button onClick={() => handleEditNote(index)}>Edit</button>
              <button onClick={() => handleDeleteNote(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;
