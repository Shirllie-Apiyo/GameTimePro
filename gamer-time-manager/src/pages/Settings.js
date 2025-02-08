import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Settings = () => {
  const [dailyGamingLimit, setDailyGamingLimit] = useState(0);

  useEffect(() => {
    // Fetch user's current settings
    const fetchSettings = async () => {
      try {
        const response = await axios.get('/api/users/current'); // Replace with your API endpoint
        setDailyGamingLimit(response.data.dailyGamingLimit);
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };

    fetchSettings();
  }, []);

  const handleSave = async () => {
    try {
      await axios.put('/api/users/update', { dailyGamingLimit }); // Replace with your API endpoint
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  return (
    <div>
      <h1>Settings</h1>
      <div>
        <label>
          Daily Gaming Limit (minutes):
          <input
            type="number"
            value={dailyGamingLimit}
            onChange={(e) => setDailyGamingLimit(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default Settings;