import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    // Fetch user's schedule from the backend
    const fetchSchedule = async () => {
      try {
        const response = await axios.get('/api/schedule'); // Replace with your API endpoint
        setSchedule(response.data);
      } catch (error) {
        console.error('Error fetching schedule:', error);
      }
    };

    fetchSchedule();
  }, []);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div>
      <h1>Calendar</h1>
      <Calendar onChange={handleDateChange} value={date} />
      <div>
        <h2>Schedule for {date.toDateString()}</h2>
        <ul>
          {schedule
            .filter((activity) => new Date(activity.startTime).toDateString() === date.toDateString())
            .map((activity, index) => (
              <li key={index}>
                {activity.activity}: {new Date(activity.startTime).toLocaleTimeString()} -{' '}
                {new Date(activity.endTime).toLocaleTimeString()}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default CalendarPage;