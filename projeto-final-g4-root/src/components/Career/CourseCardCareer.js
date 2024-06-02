import React from "react";

const CourseCardCareer = ({ career, onClick }) => {
  if (!career || !career.course) {
    return <div>Loading...</div>;
  }

  return (
    <div onClick={onClick} className="bg-card-img bg-cover rounded-2xl h-80 flex flex-col justify-between cursor-pointer">
      <p className="text-sm text-white pt-4 mx-4">
        Rating: {career.course.rating}
      </p>
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
