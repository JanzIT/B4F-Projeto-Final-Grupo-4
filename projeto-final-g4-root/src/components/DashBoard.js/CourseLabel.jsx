import React from "react";

const CourseLabel = ({ career }) => {
  if (!career) {
    return null; // Retorna null se career for indefinido ou null
  }
  return (
    <div className="bg-gradient-to-bl from-blue-800 to-purple-700 rounded-3xl p-2 px-4 flex items-center justify-center text-white whitespace-nowrap">
      {career.careerName}
    </div>
  );
};

export default CourseLabel;
