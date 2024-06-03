import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import CareerPlan from "@/components/Career/CareerPlan";
import CourseCardCareer from "@/components/Career/CourseCardCareer";
import NavBar from "@/components/NavBar/NavBar";
import { useUser } from "@/hooks/useUser";

function Career() {
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

  if (!user) {
    return <div>Loading...</div>;
  }

  const navigateToCourse = () => {
    router.push("/course");
  };

  return (
    <div className="bg-slate-950 p-8 min-h-screen text-white">
      <div className="bg-gradient-to-t from-indigo-800 to-violet-500 rounded-xl h-50 flex flex-row items-center justify-center p-4">
        <div className="flex flex-row items-center">
          <div>
            <p className="text-lg">You are migrating to</p>
            <h1 className="text-3xl font-semibold">
              {chosenCareer?.careerName || "Loading..."}
            </h1>
          </div>
          <div>
            <img src="/img-career.png" alt="profile" />
          </div>
        </div>
      </div>

      <div className="text-white mt-4 mb-4 p-2">
        <p className="text-2xl font-semibold">Career Overview</p>
        <p>
          {chosenCareer?.careerDescription || "Loading career description..."}
        </p>
      </div>

      <div className="min-h-screen text-white">
        <CareerPlan />
      </div>

  
        <p className="text-2xl mb-3">Recommended course</p>
        <CourseCardCareer career={chosenCareer} 
        onClick={navigateToCourse} />
      

      <NavBar />
      <div className="h-20 w-11/12"></div>
    </div>
  );
}

export default Career;

