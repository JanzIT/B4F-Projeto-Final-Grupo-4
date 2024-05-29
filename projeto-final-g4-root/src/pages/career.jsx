import React from "react";
import CareerPlan from "@/components/Career/CareerPlan";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import CourseCardCareer from "@/components/Career/CourseCardCareer";
import NavBar from "@/components/NavBar/NavBar";

function Career() {
  const [chosenCareer, setChosenCareer] = useState({});
  const router = useRouter;

  useEffect(() => {
    fetch("/api/user?type=chosenCareer")
      .then((response) => response.json())
      .then((data) => setChosenCareer(data))
      .catch((error) => console.error("Error fetching chosen career:", error));
  }, []);

  return (
    <div className=" bg-slate-950 p-6 min-h-screen  text-white ">
      <div
        className="
        bg-gradient-to-t from-indigo-800 to-violet-500 
        rounded-xl h-52  flex flex-row items-center justify-center
        p-4
        "
      >
        <div className="flex flex-row items-center">
          <div className="">
            <p className="text-lg">You are migrating to</p>
            <h1 className="text-5xl font-semibold mb-4">
              {chosenCareer.careerName || "Loading..."}
            </h1>
          </div>

          <div className="">
            <img src="/img-career.png" alt="profile" className="" />
          </div>
        </div>
      </div>

      <div className="text-white mt-7 mb-7">
        {" "}
        <p className="text-2xl font-semibold">Career Overview</p>
        <p className="">
          {chosenCareer.careerDescription || "Loading career description..."}
        </p>
      </div>
      
      <div className="min-h-screen text-white">
          <div className="">
            <CareerPlan />
          </div>
        
      </div>

      <div className="mt-7">
        <p className="text-2xl mb-3">Recommended course</p>
        <CourseCardCareer career={chosenCareer} />
      </div>

      <div className="h-14 bg-orange-900">sdf</div>
      <NavBar />
    </div>
  );
}

export default Career;
