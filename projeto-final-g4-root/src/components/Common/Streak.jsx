import React from "react";

const Streak = () => {
  // Definindo a frequência fictícia do streak
  const streakDays = 1;

  return (
    <div className="bg-neutral-900 rounded-3xl mb-6">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-t-3xl">
        <h2 className="text-white text-2xl font-semibold mb-4 px-6 py-3 text-center">
          Your streak
        </h2>
      </div>
      <div className="pt-4 pb-6 px-6">
        <p className="text-white text-2xl mb-2">
          Your streak is: {streakDays} day
        </p>
        <p className="text-white mb-6">Keep it up tomorrow!</p>
        <div className="flex justify-between text-white mb-2">
          <span className="day-circle-empty">S</span>
          <span className="day-circle-empty">M</span>
          <span className="day-circle">T</span>
          <span className="day-circle-empty">W</span>
          <span className="day-circle-empty">T</span>
          <span className="day-circle-empty">F</span>
          <span className="day-circle-empty">S</span>
        </div>
      </div>
    </div>
  );
};

export default Streak;
