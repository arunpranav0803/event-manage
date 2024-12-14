import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EventDetails.css';  // Import the CSS file

const EventDetails = () => {
  const { id } = useParams();  // Get the event ID from the URL
  const [event, setEvent] = useState(null);
  const [attendeesToAdd, setAttendeesToAdd] = useState(0); // State for number of attendees to add
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // Hook to navigate programmatically

  useEffect(() => {
    // Fetch events from localStorage
    const events = JSON.parse(localStorage.getItem('events')) || [];

    // Find the event that matches the given ID
    const foundEvent = events.find(event => event.id === parseInt(id)); // Ensure the ID is an integer

    if (foundEvent) {
      setEvent(foundEvent);  // If the event is found, set it to state
    } else {
      console.error('Event not found!');
    }
  }, [id]);  // Re-run the effect whenever the `id` changes

  const handleDelete = () => {
    // Fetch events from localStorage
    const events = JSON.parse(localStorage.getItem('events')) || [];

    // Filter out the event to delete it
    const updatedEvents = events.filter(event => event.id !== parseInt(id));

    // Update localStorage with the new event list
    localStorage.setItem('events', JSON.stringify(updatedEvents));

    // Redirect to dashboard after deletion
    navigate('/dashboard');  // Redirect to dashboard (or homepage)
  };

  const handleAddAttendees = () => {
    if (attendeesToAdd <= 0 || isNaN(attendeesToAdd)) {
      setError('Please enter a valid number of attendees.');
      return;
    }

    // Update the event with new attendees
    const updatedEvent = { ...event, attendees: event.attendees + parseInt(attendeesToAdd) };

    // Fetch events from localStorage
    const events = JSON.parse(localStorage.getItem('events')) || [];

    // Find and update the event in the events array
    const updatedEvents = events.map(e => e.id === event.id ? updatedEvent : e);

    // Update localStorage with the new events list
    localStorage.setItem('events', JSON.stringify(updatedEvents));

    // Update state to reflect the new number of attendees
    setEvent(updatedEvent);
    setAttendeesToAdd(0);  // Clear the input field
    setError(null);  // Clear any previous error message
  };

  if (!event) {
    return <div>Loading...</div>;  // Show loading until the event is found
  }

  return (
    <div className="event-details-container">
      <h1>{event.name}</h1>
      <p>{event.description}</p>
      <p>Date: {new Date(event.date).toLocaleDateString()}</p>
      <p>Attendees: {event.attendees}</p>

      {/* Input to add attendees */}
      <div>
        <label htmlFor="attendees">Add Attendees:</label>
        <input
          type="number"
          id="attendees"
          value={attendeesToAdd}
          onChange={(e) => setAttendeesToAdd(e.target.value)}
          min="1"
        />
        <button onClick={handleAddAttendees} className="btn-add-attendees">
          Add Attendees
        </button>
        {error && <p className="error-message">{error}</p>}
      </div>

      {/* Delete button */}
      <button onClick={handleDelete} className="btn-delete-event">
        Delete Event
      </button>
    </div>
  );
};

export default EventDetails;
