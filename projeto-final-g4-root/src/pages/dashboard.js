import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import NavBar from "@/components/NavBar/NavBar";
import CourseCardDash from "@/components/DashBoard.js/CourseCardDash";
import CourseLabel from "@/components/DashBoard.js/CourseLabel";
import withAuth from "@/components/Auth/withAuth";
import { useUser } from "@/hooks/useUser";
import Streak from "@/components/Common/Streak";

function Dashboard() {
  const [userName, setUserName] = useState("");
  const [careerSuggestions, setCareerSuggestions] = useState([]);
  const { user, setUser } = useUser();

  useEffect(() => {
    const fetchUserData = async () => {
      if (user && user._id) {
        try {
          const response = await fetch(`/api/user/${user._id}`);
          const data = await response.json();
          if (data.user) {
            setUser(data.user);
            setUserName(data.user.name);
            setCareerSuggestions(data.user.careerSuggestions || []);
          }
        } catch (error) {
          console.error("Error fetching career suggestions:", error);
        }
      }
    };

    fetchUserData();
  }, [user?._id]);

  if (!user) {
    return <div>LOADING SCREEN</div>;
  }

  const [firstCareer, secondCareer, thirdCareer, fourthCareer, fifthCareer] =
    careerSuggestions;

  const backgroundImages = [
    "cardbgimg1.png",
    "cardbgimg2.png",
    "cardbgimg3.png",
  ]; // Adicionando a terceira imagem de fundo

  return (
    <div className="text-white bg-slate-950 p-6">
      <div className="flex justify-between mt-8">
        <div>
          <h1 className="text-3xl font-semibold mb-4">Hi, {userName}</h1>
          <h2 className="font-medium text-2xl">Find your new career</h2>
        </div>
        <div className="h-20 mb-2">
          <img src="/img-profile.png" alt="profile" className="mb-6" />
        </div>
      </div>

      <div>
        <div className="flex items-center w-full bg-zinc-800 p-2 my-2 mt-2 rounded-3xl">
          <FaSearch className="text-gray-500 mx-3" />
          <input
            type="text"
            className="bg-zinc-800 text-gray-500 flex-grow focus:outline-none"
            placeholder="Search..."
          />
        </div>
        <p className="mb-4 mt-8">This career is an 80% match for you.</p>
      </div>

      {firstCareer && (
        <div className="bg-gradient-to-t from-indigo-800 to-violet-500 rounded-3xl px-4 py-4 flex flex-row items-center justify-center h-40">
          <div className="flex flex-row items-center p-2">
            <div className="mx-4">
              <h3 className="text-4xl font-semibold mb-2">
                {firstCareer.careerName}
              </h3>
              <button>Start Your Journey</button>
            </div>
            <div>
              <img src="/img-career.png" alt="career" />
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 mb-8">
        <p className="font-medium text-2xl">Careers that might interest you</p>
        <div className="flex items-center text-xl gap-2 mt-4 overflow-x-scroll ">
          {[secondCareer, thirdCareer, fourthCareer, fifthCareer].map(
            (career, index) =>
              career && <CourseLabel key={index} career={career} />
          )}
        </div>
      </div>

      <div>
        <p className="font-medium text-2xl">Popular courses</p>
        <div className="mt-4 flex flex-row overflow-x-scroll ">
          <div className="text-4xl flex">
            {firstCareer && (
              <CourseCardDash
                career={firstCareer}
                backgroundImage={backgroundImages[0]}
              />
            )}
            {secondCareer && (
              <CourseCardDash
                career={secondCareer}
                backgroundImage={backgroundImages[1]}
              />
            )}
            {thirdCareer && (
              <CourseCardDash
                career={thirdCareer}
                backgroundImage={backgroundImages[2]}
              />
            )}
          </div>
        </div>
      </div>

      <div className="mt-10">
        <Streak />
      </div>

      <div className="bg-gradient-to-br from-amber-700 to-rose-700 mt-10 my-10 flex flex-row items-center justify-center rounded-3xl p-3 ">
        <div className="">
          <p className="text-3xl font-semibold">You're on fire!</p>
          <p className="text-lg font-medium">5 Days Challenge</p>
        </div>

        <img src="/img-chalenge.png" alt="Challenge" className="" />
      </div>
      <NavBar />
      <div className="h-14 w-11/12"></div>
    </div>
  );
}

export default withAuth(Dashboard);
