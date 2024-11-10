import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ReadingLimitReached = () => {
  const [timeRemaining, setTimeRemaining] = useState({});
  const navigate = useNavigate();

  // Calculate the time remaining until midnight
  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0); // Set to midnight of the next day
      const diff = midnight - now;

      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeRemaining({ hours, minutes, seconds });
    };

    // Update every second
    const timerId = setInterval(calculateTimeRemaining, 1000);
    calculateTimeRemaining(); // Call immediately to avoid delay

    // Cleanup interval on component unmount
    return () => clearInterval(timerId);
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }} className='fixed -translate-x-1/2 -translate-y-1/2 bg-white top-1/2 left-1/2'>
      <h1>Daily Reading Limit Reached</h1>
      <p>You’ve reached your daily limit of reading articles. Please wait until midnight for more access.</p>

      <div style={{ fontSize: '1.5em', margin: '20px 0' }}>
        <p>Time remaining until access resets:</p>
        <p>
          {timeRemaining.hours ?? '00'}:{timeRemaining.minutes ?? '00'}:{timeRemaining.seconds ?? '00'}
        </p>
      </div>

      <button
        className='font-serif'
        style={{ margin: '10px', padding: '10px 20px', cursor: 'pointer' }}
        onClick={() => navigate('/profile/premium')}
      >
        Go Premium
      </button>

      <button
        className='font-serif'
        style={{ margin: '10px', padding: '10px 20px', cursor: 'pointer' }}
        onClick={() => navigate('/home')}
      >
        Back to Home
      </button>
    </div>
  );
};

export default ReadingLimitReached;
