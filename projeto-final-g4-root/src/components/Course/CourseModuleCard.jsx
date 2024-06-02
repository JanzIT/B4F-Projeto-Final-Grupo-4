// components/CourseCard.js
import React from "react";
import { FaPlay } from "react-icons/fa";

const CourseCard = ({ title, skills }) => {
  const renderSkills = (skills) => (
    <div className="grid grid-cols-1 gap-4">
      {skills.map((skill, index) => (

        <div key={index} 

        className="flex items-center justify-between bg-neutral-800 rounded-lg p-4 shadow-lg hover:bg-indigo-600">

          <h4 
          className="text-lg font-semibold">{skill.name}
          </h4>
          <FaPlay 
          className="text-[#6f6cff]" />
          
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-neutral-900 rounded-2xl p-6 mb-6 shadow-lg">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      {renderSkills(skills)}
    </div>
  );
};

export default CourseCard;
