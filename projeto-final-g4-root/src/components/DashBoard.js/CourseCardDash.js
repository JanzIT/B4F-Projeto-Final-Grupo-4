import React from "react";

const CourseCardDash = ({ career }) => {
  return (
    <div className="bg-card-img bg-cover rounded-2xl flex flex-col justify-between shadow-md h-60">
      <p className="text-xs">Rating: {career.course.rating}</p>

      <div className="bg-white text-black rounded-3xl p-3 mt-2 ">
        <div className="text-xl font-semibold">{career.careerName}</div>

        <div className="text-lg flex justify-between">
          <p>{career.course.price}</p>

          <p>{career.course.classHours}h</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCardDash;
