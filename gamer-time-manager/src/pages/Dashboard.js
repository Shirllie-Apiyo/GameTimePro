import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data from the backend
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/users/current'); // Replace with your API endpoint
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {userData ? (
        <div>
          <p>Welcome, {userData.username}!</p>
          <p>Coins: {userData.coins}</p>
          <p>Gaming Time Left: {userData.dailyGamingLimit} minutes</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;