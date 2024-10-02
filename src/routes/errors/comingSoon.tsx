import { useEffect, useState } from "react";

export const ComingSoon = () => {
  // State for countdown values
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set the date we're counting down to
    const countDownDate = new Date("Jan 1, 2025 00:00:00").getTime();

    // Update the countdown every 1 second
    const timer = setInterval(() => {
      // Get today's date and time
      const now = new Date().getTime();

      // Find the distance between now and the count down date
      const distance = countDownDate - now;

      // Time calculations for days, hours, minutes, and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // If the countdown is over, stop the interval
      if (distance < 0) {
        clearInterval(timer);
      } else {
        // Update the state with the new time values
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen px-2 bg-gradient-to-tr from-sky-300 via-sky-400 to-blue-500">
      <div className="max-w-lg mx-auto overflow-hidden bg-white rounded-lg shadow-lg">

        <div className="px-6 py-4">
          <h2 className="text-4xl font-bold text-gray-800">Đang phát triển</h2>
          <p className="mt-2 text-lg text-gray-600">Chúng tôi đang tiếp tục phát triển và cải tiến website. Hãy đón chờ nhé!</p>
        </div>

        <div className="px-6 py-4">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="px-4 py-2 border rounded-lg">
              <div className="font-mono text-2xl font-bold text-gray-800">
                {timeLeft.days}d
              </div>
            </div>
            <div className="px-4 py-2 border rounded-lg">
              <div className="font-mono text-2xl font-bold text-gray-800">
                {timeLeft.hours}h
              </div>
            </div>
            <div className="px-4 py-2 border rounded-lg">
              <div className="font-mono text-2xl font-bold text-gray-800">
                {timeLeft.minutes}m
              </div>
            </div>
            <div className="px-4 py-2 border rounded-lg">
              <div className="font-mono text-2xl font-bold text-gray-800">
                {timeLeft.seconds}s
              </div>
            </div>
          </div>
        </div>
        <img src="/loading-gif.gif" />

      </div>
    </div>
  );
};
