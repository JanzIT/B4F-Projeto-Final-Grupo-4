import React from "react";

const CourseCardCareer = ({ career }) => {
  if (!career || !career.course) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="bg-card-img	
    pb rounded-xl shadow-lg h-80 content-end mb-20 "
    >
      <div>
        <p className="text-sm text-white ml-4 mb-28">
          Rating: {career.course.rating}
        </p>

        <div
        className="bg-gray-100 text-gray-900
        rounded-3xl h-24
        m-4 pb-2 ">

          <div>
            <p className="text-2xl font-medium">{career.careerName}</p>
          </div>
          .
          <div
            className="text-lg flex        justify-between"
          >
            <p>{career.course.price}</p>

            <p>{career.course.classHours}h</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCardCareer;
