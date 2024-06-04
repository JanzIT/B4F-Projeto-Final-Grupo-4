import React from "react";
import { FaStar } from "react-icons/fa";


const CourseCardCareer = ({ career, onClick }) => {
  if (!career || !career.course) {
    return <div className="bg-gradient-to-b from-slate-950 to-violet-950 inline-flex flex-col items-center p-[180px_24px_100px_24px] gap-[138px] h-[220vw] w-full text-white">LOADING SCREEN</div>;
  }

  return (
    <div onClick={onClick} className="bg-card-img bg-cover rounded-2xl h-80 flex flex-col justify-between cursor-pointer">
      <div className="flex items-center p-4">
        <FaStar className="text-yellow-400 mr-1" />
        <span>{career.course.rating}</span>
      </div>
      <div className="bg-gray-100 text-gray-900 rounded-3xl h-24 m-4 p-4">
        <p className="text-2xl font-medium">{career.careerName}</p>
        <div className="text-lg flex justify-between mt-1">
          <p>{career.course.price}</p>
          <p>{career.course.classHours}h</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCardCareer;
