import React from "react";

const CourseCardDash = ({ career, backgroundImage }) => {
  return (

    <div className="bg-cover rounded-2xl mr-4"
    style={{ backgroundImage: `url(${backgroundImage})` }}>
      
      <div className=" h-60 w-52 flex flex-col justify-between">
        <p className="text-sm text-white p-2 ">
          Rating: {career.course.rating}
        </p>

        <div className="bg-white text-black rounded-3xl p-3 m-2 ">
          <div className="text-lg font-semibold">{career.careerName}</div>

          <div className="text-base flex justify-between">
            <p>{career.course.price}</p>

            <p>{career.course.classHours}h</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCardDash;
