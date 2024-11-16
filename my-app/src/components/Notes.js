import React, { useState, useEffect } from 'react';

const Notes = () => {
  const [notes, setNotes] = useState('');

  // Load notes from localStorage when the component mounts
  useEffect(() => {
    const savedNotes = localStorage.getItem('weeklyNotes');
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  // Save notes to localStorage whenever the user types
  const handleNotesChange = (event) => {
    const updatedNotes = event.target.value;
    setNotes(updatedNotes);
    localStorage.setItem('weeklyNotes', updatedNotes);
  };

  return (
    <div className="notes-section"> 
      <h3>Notes</h3>
      <textarea
        value={notes}
        onChange={handleNotesChange}
        placeholder="Type your weekly notes here..."
        rows={6}
        className="notes-textarea"
      ></textarea>
    </div>
  );
};

export default Notes;