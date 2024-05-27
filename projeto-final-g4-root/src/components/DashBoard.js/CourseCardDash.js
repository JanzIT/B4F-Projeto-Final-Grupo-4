import React from "react";

const CourseCardDash = ({ career }) => {
  return (
    <div className="bg-red-600 p-4 rounded-lg shadow-md h-60">
      <p className="text-xs">Rating: {career.course.rating}</p>

      <div className="bg-white text-black rounded-3xl p-3 mt-2 ">
        <div className="text-xl font-semibold">{career.careerName}</div>

        <div className="text-lg">
          <p>Price: {career.course.price}</p>

          <p>Class Hours: {career.course.classHours}</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCardDash;
