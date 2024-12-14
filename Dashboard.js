import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaUsers, FaPlusCircle } from 'react-icons/fa';
import './Dashboard.css';  // Ensure you add the CSS file for styling

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalAttendees: 0,
  });

  // Fetch events from localStorage when component mounts
  useEffect(() => {
    // Simulate fetching data from localStorage
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];

    setEvents(storedEvents);
    setLoading(false);

    // Calculate stats based on stored events
    setStats({
      totalEvents: storedEvents.length,
      totalAttendees: storedEvents.reduce((acc, event) => acc + event.attendees, 0),
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Event Dashboard</h1>
        <p>Your Dashboard for event management</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <FaCalendarAlt className="stat-icon" />
          <h3>Created Events</h3>
          <p>{stats.totalEvents}</p>
        </div>
        <div className="stat-card">
          <FaUsers className="stat-icon" />
          <h3>Total Attendees</h3>
          <p>{stats.totalAttendees}</p>
        </div>
      </div>

      <div className="actions">
        <Link to="/create-event">
          <button className="btn-create-event">
            <FaPlusCircle /> Create New Event
          </button>
        </Link>
      </div>

      <div className="upcoming-events">
        <h2>Upcoming Events</h2>
        {events.length === 0 ? (
          <p>No upcoming events</p>
        ) : (
          <div className="event-cards">
            {events.slice(0, 5).map(event => (
              <div key={event.id} className="event-card">
                <h3>{event.name}</h3>
                <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                <p>{event.attendees} Attendees</p>
                <Link to={`/event/${event.id}`} className="btn-view-event">
                  View Event Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
