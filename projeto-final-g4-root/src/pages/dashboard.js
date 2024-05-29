import { useState, useEffect } from "react";
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
    if (!user) return;

    fetch(`/api/user/${user._id}`)
      .then((response) => response.json())
      .then((data) => {
        const { user } = data;
        setUser(user);
        setUserName(user.name);
        setCareerSuggestions(user.careerSuggestions || []);
      })
      .catch((error) =>
        console.error("Error fetching career suggestions:", error)
      );
  }, [user, setUser]);

  if (!user) {
    return <div>LOADING SCREEN</div>;
  }

  const [firstCareer, secondCareer, thirdCareer, fourthCareer, fifthCareer] =
    careerSuggestions;

  const backgroundImages = ["cardbgimg1.png", "cardbgimg2.png"];

  return (
    <div className="text-white bg-slate-950 p-6">
      <div className="flex justify-between mt-8">
        <div>
          <h1 className="text-3xl font-semibold mb-4">Hi, {userName}</h1>
          <h2>Find your new career</h2>
        </div>
        <div className="h-20">
          <img src="/img-profile.png" alt="profile" className="mb-6" />
        </div>
      </div>

      <div>
        <div className="flex items-center w-full">
          <input
            type="text"
            className="bg-zinc-800 p-2 my-2 mt-2 rounded-3xl flex-grow focus:outline-none"
            placeholder="Search..."
          />
        </div>
        <p className="mb-4 mt-5">This career is an 80% match for you.</p>
      </div>

      {firstCareer && (
        <div className="bg-gradient-to-t from-indigo-800 to-violet-500 rounded-xl px-4 py-4 flex flex-row items-center justify-center h-40">
          <div className="flex flex-row items-center p-2">
            <div className="mx-4">
              <h3 className="text-4xl font-semibold mb-2">
                {firstCareer.careerName}
              </h3>
              <button>Call to Action</button>
            </div>
            <div>
              <img src="/img-career.png" alt="career" />
            </div>
          </div>
        </div>
      )}

      <div className="mt-5">
        <p className="font-medium text-xl">Careers that might interest you</p>
        <div className="flex items-center text-xl gap-2 mt-3 overflow-x-scroll">
          {[secondCareer, thirdCareer, fourthCareer, fifthCareer].map(
            (career, index) =>
              career && <CourseLabel key={index} career={career} />
          )}
        </div>
      </div>

      <div className="mt-4">
        <p>Popular courses</p>
        <div className="mt-2 flex flex-row overflow-x-scroll">
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
