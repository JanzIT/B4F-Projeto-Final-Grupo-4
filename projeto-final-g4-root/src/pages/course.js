import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "@/hooks/useUser";
import withAuth from "@/components/Auth/withAuth";
import CourseModuleCard from "@/components/Course/CourseModuleCard";
import { IoIosArrowBack } from "react-icons/io";



function CoursePage() {
  const { user } = useUser();
  const [chosenCareer, setChosenCareer] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      if (user && user._id) {
        try {
          const response = await fetch(`/api/user/${user._id}`);
          const data = await response.json();
          if (data.user && data.user.chosenCareer) {
            setChosenCareer(data.user.chosenCareer);
          }
        } catch (error) {
          console.error("Error fetching chosen career:", error);
        }
      }
    };

    fetchUserData();
  }, [user?._id]);

  if (!user || !chosenCareer) {
    return <div className="bg-gradient-to-b from-slate-950 to-violet-950 inline-flex flex-col items-center p-[180px_24px_100px_24px] gap-[138px] h-[220vw] w-full text-white">LOADING SCREEN</div>;
  }


  const backToCareer = () => {
    router.push("/career");
  };

  return (
    <div className="bg-slate-950 p-6 min-h-screen text-white">
      <div className="flex items-center mb-6">

        <button onClick={backToCareer} className="mr-4">
          <IoIosArrowBack className="text-white text-2xl" />
        </button>
        <h1 className="text-2xl font-medium">Recommended course</h1>
      </div>

      <div className="bg-gradient-to-t from-indigo-800 to-violet-500 rounded-xl h-50 flex flex-row items-center justify-center p-4">
        <div className="flex flex-row items-center">
          <div>
            <h1 className="text-4xl font-semibold mb-4">
              {chosenCareer?.careerName || "Loading..."}
            </h1>
          </div>
          <div>
            <img src="/img-career.png" alt="profile" />
          </div>
        </div>
      </div>


      {/* <div className="text-white mt-2 mb-7">

        <p className="text-lg font-medium">{chosenCareer.careerDescription}</p>
      </div> */}


      <div className="text-white p-4">
        <p className="text-2xl font-semibold">Course Details</p>
        <p>Rating: {chosenCareer.course.rating}</p>
        <p>Class Hours: {chosenCareer.course.classHours} hours</p>
      </div>

      <div className="  text-white mt-4 mb-7">
        <CourseModuleCard title="Essentials" skills={chosenCareer.careerPlan.essentials} />
        <CourseModuleCard title="Intermediate" skills={chosenCareer.careerPlan.intermediate} />
        <CourseModuleCard title="Advanced" skills={chosenCareer.careerPlan.advanced} />
      </div>


    </div>
  );
}

export default withAuth(CoursePage);
