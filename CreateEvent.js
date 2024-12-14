import React, { useState } from 'react';

import './CreateEvent.css';  // Ensure the CSS file path is correct

const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    date: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Store event data in localStorage (as we're not using a real DB)
      const events = JSON.parse(localStorage.getItem('events')) || [];
      const newEvent = {
        ...eventData,
        id: events.length + 1, // Assign a unique ID to the event
        attendees: 0, // Initialize attendees count to 0
      };

      // Add the new event to localStorage
      events.push(newEvent);
      localStorage.setItem('events', JSON.stringify(events));

      // Simulate API response with the new event data
      setSuccess(true); // Set success state for showing success message

      // Clear form fields after submission
      setEventData({
        name: '',
        description: '',
        date: ''
      });

    } catch (err) {
      console.error('Error creating event:', err);
      setError('There was an error creating the event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-event-container">
      <h1>Create a New Event</h1>
      <form onSubmit={handleSubmit} className="create-event-form">
        <div className="form-group">
          <label htmlFor="name">Event Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={eventData.name}
            onChange={handleChange}
            placeholder="Enter event name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={eventData.description}
            onChange={handleChange}
            placeholder="Enter event description"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Event Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={eventData.date}
            onChange={handleChange}
            required
          />
        </div>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">Event created successfully!</p>}

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Creating...' : 'Create Event'}
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
