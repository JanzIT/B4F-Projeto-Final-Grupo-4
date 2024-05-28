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
    <div className=" bg-slate-950 p-4 min-h-screen">
      <div
        className="
        bg-gradient-to-t from-indigo-800 to-violet-500 text-white min-w-10
        rounded-xl p-1 m-2 h-52
        align-middle
"
      >
        <div className="flex">
          <div>
            <p>You are migrating to</p>
            <h1 className="text-3xl font-semibold mb-4">
              {chosenCareer.careerName || "Loading..."}
            </h1>
          </div>

          <div className="mr-5">

            <img src="/img-career.png" alt="profile" className="h-40 w-" />
            
          </div>

        </div>

      </div>

      <div className="text-white">
        {" "}
        <p>Career Overview</p>
        <p>
          {chosenCareer.careerDescription || "Loading career description..."}
        </p>
      </div>
      <div className="min-h-screen text-white">
        <div>
          <div className="bg-neutral-800">
            <div className="">
              <CareerPlan />
            </div>
          </div>
        </div>

      </div>

      <div>
        <CourseCardCareer career={chosenCareer} />
      </div>
      
      <NavBar />
    </div>
  );
}

export default Career;
