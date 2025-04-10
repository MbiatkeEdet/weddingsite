"use client";
import { useState, useEffect } from "react";

export default function CountdownTimer() {
  const weddingDate = new Date("2025-05-03T12:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date().getTime();
    const difference = weddingDate - now;

    return difference > 0
      ? {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        }
      : { days: 0, hours: 0, minutes: 0, seconds: 0 }; // If event has passed
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 text-gray-800 p-6 bg-[url('/trad1.jpg')] bg-no-repeat bg-contain bg-center bg-repeat-x">
      <h1 className="text-6xl italic font-serif font-bold text-center text-white mb-4">
        Chioma & Mbiatke ❤️
      </h1>
      <p className="text-xl font-semibold mb-4 text-white italic">3rd May, 2025 • 10 am</p>

      <div className="grid grid-cols-4 gap-4 text-center text-white font-bold text-2xl">
        {["Days", "Hours", "Minutes", "Seconds"].map((unit, index) => (
          <div key={index} className="bg-pink-300 p-6 rounded-lg shadow-lg">
            <p>{timeLeft[unit.toLowerCase()]}</p>
            <span className="text-sm">{unit}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
